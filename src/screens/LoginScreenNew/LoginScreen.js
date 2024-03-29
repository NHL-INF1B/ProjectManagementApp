import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import handlerPath from "../../../env";

const LoginScreen = ({ navigation }) => {
  //get data when the page opens.
  useEffect(() => {
    const data = getData();
    data.then((data) => {
      if (data != null) {
        navigation.navigate("WelcomeScreen");
      }
    });    
  }, []);

  //declaring the const.
  const [errorText, setErrorText] = useState("");
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //send the data to the api when the button is pressed
  const onSubmit = (data) => {
    sendDataToAPI(data.email, data.password);
  };

  //get the data from the async storage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user_data");
      if (jsonValue !== null) {
        return JSON.parse(jsonValue);
      }
    } catch (e) {
      alert(e);
    }
  };

  //store the data in the async storage
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@user_data", jsonValue);
    } catch (e) {
      alert(e);
    }
  };

  //remoce a value from the async storage
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("@user_data");
    } catch (e) {
      alert(e);
    }
  };

  //send data to the API and get feedback.
  const sendDataToAPI = (email, password) => {
    try {
      fetch(handlerPath + "login/loginHandler.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          catchFeedback(response);
        });
    } catch (error) {
      alert(error);
    }
  };

  //catch the feedback from the API and give an alert.
  const catchFeedback = (response) => {
    for (let index = 0; index < response.length; index++) {
      switch (response[index]) {
        case "email_incorrect":
          alert("Deze inloggegevens kloppen niet");
          break;

        case "user_not_exists":
          alert("Deze gebruiker bestaat niet.");
          break;

        case "password_incorrect":
          alert("Deze inloggegevens kloppen niet");
          break;

        case "login_incorrect":
          alert("Deze inloggegevens kloppen niet.");
          break;

        default: 
          storeData(response[0]);
          navigation.navigate("WelcomeScreen");
          break;
      }
    }
  };

  return (
    <SafeAreaView style={Styles.SafeAreaView}>
      <ScrollView style={Styles.content}>
        <View style={Styles.head}>
          <Image
            style={Styles.logo}
            source={require("../../assets/images/logo.png")}
          />
        </View>

        <Text style={Styles.title}>Inloggen</Text>

        <View style={Styles.inputContainer}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: "Email is verplicht" },
              pattern: {
                value: EMAIL_REGEX,
                message: "Email is niet correct",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                placeholder="Emailadres"
                placeholderTextColor="#707070"
                onChangeText={(text) => onChange(text)}
                value={value}
                errorText={errors?.email?.message}
                titleText="email"
              />
            )}
          />
        </View>

        <View style={Styles.inputContainer}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: "Wachtwoord is verplicht." },
            }}
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                placeholder="Wachtwoord"
                placeholderTextColor="#707070"
                onChangeText={(text) => onChange(text)}
                value={value}
                errorText={errors?.password?.message}
                secureTextEntry={true}
                titleText="wachtwoord"
              />
            )}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <CustomButton 
            buttonType={"blueButton"}
            text={"Log in"}
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <View>
          <Pressable onPress={() => navigation.navigate("RegisterScreen")}>
            <Text style={Styles.registreren}>Registreren</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
