import { React, useState } from "react";
import Styles from "./Styles";
import { View, Text, ScrollView, Pressable, Image, SafeAreaView, } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton/CustomButton";
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import handlerPath from "../../../env";

const RegisterScreen = ({ navigation }) => {
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PASS_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,254}$/;
  const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

  const [isShowingDatePicker, setShowingDatePicker] = useState(false);

  const { control, handleSubmit, formState: { errors }, getValues, } = useForm({
    defaultValues: {
      name: "",
      dateOfBirth: "",
      email: "",
      password: "",
      password_repeat: "",
    },
  });

  const replaceAll = (string, search, replace) => {
    return string.split(search).join(replace);
  }

  const onSubmit = (data) => {
    sendDataToAPI(
      data.name,
      data.email,
      data.dateOfBirth,
      data.password,
      data.password_repeat
    )
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
        handlerPath + "registration/registrationHandler.php",
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
        .then((response) => response.json())
        .then((response) => {
          
          catchFeedback(response);
        });
    } catch (error) {
      alert(error);
    }
  };

  const catchFeedback = (response) => {
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

          {isShowingDatePicker ? (
            <View style={Styles.inputContainer}>
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{
                  required: { value: true, message: 'Geboortedatum is verplicht' },
                  pattern: {
                    value: DATE_REGEX,
                    message: 'Geboortedatum is incorrect'
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    style={{ width: "70%", alignSelf: "center", borderWidth: 3, borderRadius: 10, borderColor: '#00AABB', }}
                    onSelectedChange={date => onChange(replaceAll(date, "/", "-"))}
                    current={getValues("dateOfBirth")}
                    mode="calendar"
                    maximumDate={new Date().toJSON().slice(0, 10).replace(/-/g, '/')}
                  />
                )}
              />
              {errors?.dateOfBirth?.message && (
                <Text style={Styles.errorText}>{errors?.dateOfBirth?.message}</Text>
              )}
            </View>
          ) : (
            <View style={Styles.inputContainer}>
              <Pressable>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  rules={{
                    required: { value: true, message: 'Datum is verplicht' },
                    pattern: {
                      value: DATE_REGEX,
                      message: 'Datum is incorrect'
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <View>
                      <CustomTextInput
                        placeholder="Kies een datum"
                        placeholderTextColor="#707070"
                        onFocus={() => setShowingDatePicker(true)}
                        onChangeText={(text) => onChange(text)}
                        value={getValues("dateOfBirth")}
                        errorText={errors?.dateOfBirth?.message}
                        titleText="Geboortedatum"
                      />
                    </View>
                  )}
                />
              </Pressable>
            </View>
          )
          }

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

          <View style={{ marginBottom: 20 }}>
            <CustomButton
              buttonType={"blueButton"}
              text={"Registreren"}
              onPress={handleSubmit(onSubmit)}
            />
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
