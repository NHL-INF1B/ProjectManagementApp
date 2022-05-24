import { React, useState } from "react";
import Styles from "./Styles";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = ({ navigation }) => {

  //form handling
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PASS_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,254}$/;
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_repeat: "",
    },
  });

  const onSubmit = (data) => {
    sendDataToAPI(
      data.name,
      data.email,
      "2000-01-01",
      data.password,
      data.password_repeat
    );
    console.log(data);
  };

  const sendDataToAPI = (
    name,
    email,
    dateOfBirth,
    password,
    confirmPassword
  ) => {
    try {
      fetch(
        "http://localhost/PMA/PmaAPI/handlers/registration/registrationHandler.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            dateOfBirth: dateOfBirth,
            password: password,
            confirmPassword: confirmPassword,
          }),
        }
      )
        // .then((response) => response.text())
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          catchFeedback(response);
        });
    } catch (error) {
      alert(error);
    }
  };

  const catchFeedback = (response) => {
    // console.log(response);

    switch (response[0]) {
      case "name_incorrect":
        alert("De naam is verkeerd.");
        break;
      case "email_incorrect":
        alert("Het emailadres is verkeerd.");
        break;
      case "dateOfBirth_incorrect":
        alert("De geboortedatum is verkeerd.");
        break;
      case "password_incorrect":
        alert("Het eerste wachtwoord is verkeerd.");
        break;
      case "confirmPassword_incorrect":
        alert("Het tweede wachtwoord is verkeerd.");
        break;
      case "samePassword_incorrect":
        alert("De wachtwoorden zijn niet hetzelfde.");
        break;
      case "email_in_use":
        alert("Dit emailadres is al in gebruik.");
        break;
      default:
        alert("Je account is aangemaakt, log nu in met je gegevens.");
        navigation.navigate("LoginScreen");
    }
  };

  return (
    <SafeAreaView style={Styles.SafeAreaView}>
      <View style={Styles.head}>
        <Image
          style={Styles.logo}
          source={require("../../assets/images/logo.png")}
        />
      </View>

      <Text style={Styles.titel}>Registreren</Text>

      <View style={Styles.content}>
        <ScrollView>
          <View style={Styles.inputContainer}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: { value: true, message: "Naam is verplicht" },
              }}
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  placeholder="Naam"
                  placeholderTextColor="#707070"
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  errorText={errors?.name?.message}
                  titleText="naam"
                />
              )}
            />
          </View>

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
                  keyboardType="email-address"
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
                required: { value: true, message: "Wachtwoord is verplicht" },
                pattern: {
                  value: PASS_REGEX,
                  message: "Wachtwoord is te zwak",
                },
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

          <View style={Styles.inputContainer}>
            <Controller
              name="password_repeat"
              control={control}
              rules={{
                required: { value: true, message: "Wachtwoord is verplicht" },
                validate: (value) =>
                  value === getValues("password") ||
                  "Wachtwoorden zijn niet gelijk aan elkaar",
              }}
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  placeholder="Wachtwoord"
                  placeholderTextColor="#707070"
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  errorText={errors?.password_repeat?.message}
                  secureTextEntry={true}
                  titleText="Wachtwoord herhalen"
                />
              )}
            />
          </View>

          <View style={[Styles.redirectContainer, { marginBottom: 20 }]}>
            <TouchableOpacity
              style={Styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text
                style={{
                  color: "white",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Registreren
              </Text>
            </TouchableOpacity>
          </View>

          <View style={Styles.redirectContainer}>
          <View>
					<Pressable onPress={() => navigation.navigate("LoginScreen")}>
						<Text style={Styles.redirectText}>Login</Text>
					</Pressable>
				</View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
