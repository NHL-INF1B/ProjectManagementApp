import { useState, useEffect } from "react";
import { View } from "react-native";
import styles from "./Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Circle from "../../components/Circle/Circle";
import ShowProfileInfo from "../../components/TextLatenZien/ShowProfileInfo";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { useForm, Controller } from "react-hook-form";

const EditProfile = () => {
  //get information from phone
  const [oldName, setOldName] = useState("-");
  const [oldEmail, setOldEmail] = useState("-");
  const [oldDateOfBirth, setOldDateOfBirth] = useState("-");
  const [oldPhoneNumber, setOldPhoneNumber] = useState("-");
  const [oldDiscord, setOldDiscord] = useState("-");

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

  useEffect(() => {
    const data = getData();
    data.then((data) => {
      if (data !== undefined) {
        setOldName(data["name"]),
          setOldEmail(data["email"]),
          setOldDateOfBirth(data["dateOfBirth"]),
          setOldPhoneNumber(data["phoneNumber"]),
          setOldDiscord(data["discord"]);
      }
    });
  }, []);

  //form handling
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PHONE_REGEX = /^\+?([0-9]{2})\)?[-. ]?([0-9]{8})$/;
  const DISCORD_REGEX = /^.{3,32}#[0-9]{4}$/;
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      phoneNumber: "",
      discord: "",
    },
  });

  const onSubmit = (data) => {
    sendDataToAPI(
      data.name,
      data.email,
      "2000-01-01",
      data.phoneNumber,
      data.discord
    );
    console.log(data);
  };

  const sendDataToAPI = (name, email, dateOfBirth, phoneNumber, discord) => {
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
            phoneNumber: phoneNumber,
            discord: discord,
          }),
        }
      )
        // .then((response) => response.text())
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          catchFeedback(response);
        });
    } catch (error) {
      alert(error);
    }
  };

  //catch the feedback from the API
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
      case "email_in_use":
        alert("Dit emailadres is al in gebruik.");
        break;
      case "discord_incorrect":
        alert("Deze discord naam verkeerd.");
        break;
      case "phoneNumber_incorrect":
        alert("Dit telefoonnummer is niet correct.");
      default:
        alert("De gegevens zijn aangepast.");
        navigation.navigate("EditProfile");
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.person}>
        <Circle name="account" color="black" size={90} style={styles.Circle} />
      </View>
      <View style={styles.inputContainer}>
        <Controller
          name="name"
          control={control}
          rules={{
            required: { value: true, message: "Naam is verplicht" },
          }}
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              placeholder={oldName}
              onChangeText={(text) => onChange(text)}
              value={value}
              errorText={errors?.name?.message}
              titleText="naam"
            />
          )}
        />
      </View>

      <View style={styles.inputContainer}>
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
              placeholder={oldEmail}
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

      <View style={styles.inputContainer}>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: { value: true, message: "Telefoonnummer is verplicht" },
            pattern: {
              value: PHONE_REGEX,
              message:
                "Telefoonnummer is niet correct. Type het telefoonnummer als 06 12345678",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              placeholder={oldPhoneNumber}
              placeholderTextColor="#707070"
              onChangeText={(text) => onChange(text)}
              value={value}
              errorText={errors?.phone?.message}
              titleText="Telefoonnummer"
            />
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <Controller
          name="discord"
          control={control}
          rules={{
            required: { value: true, message: "Discord naam is verplicht" },
            pattern: {
              value: DISCORD_REGEX,
              message: "Discord naam is niet correct",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              placeholder={oldDiscord}
              placeholderTextColor="#707070"
              onChangeText={(text) => onChange(text)}
              value={oldDiscord}
              errorText={errors?.discord?.message}
              titleText="Discord"
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
