import React, { useEffect, useState } from "react";
import { View, Text, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import Styles from "./styles";
import CustomButton from "../../components/CustomButton/CustomButton";
import QRCode from 'react-native-qrcode-svg';
import styles from "./styles";
import Circle from "../../components/Circle/Circle";
import Header from "../../components/Header/Header";


const InviteMembers = ({route}) => {
  const [urlMail, setUrlMail] = useState("-");
  const [urlQr, setUrlQr] = useState("-");
  const [name, setName] =  useState("-");
  const [token, setToken] = useState("-");
  const { control, handleSubmit, formState: { errors }, getValues 
} = useForm({
    defaultValues: {
      email: "",
    },
  });
  //regex to check if the email is valid
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //to get the projectId from the projectpage.
  const { projectId, userId } = route.params;

  //does its thing when you open the page
  useEffect(() => {
    sendDataToAPI(projectId);
  }, []);

  //sends the project id to the database and gets the info for that project.
  const sendDataToAPI = (projectId) => {
    try {
      fetch(
        "https://inf1b.serverict.nl/handlers/InviteMembers/InviteMembers.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId: projectId,
          }),
        }
      )
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          catchFeedback(response);
        });
    } catch (error) {
      alert(error);
    }
  };
  const generateNewCode = (projectId) => {
    try {
      fetch(
        "https://inf1b.serverict.nl/handlers/InviteMembers/generateNewCode.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId: projectId,
          }),
        }
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          catchFeedback(response);
        });
    } catch (error) {
      alert(error);
    }
  }

  //catch the feeback from the API
  const catchFeedback = (response) => {
    console.log(response);
    setToken(response[0].newQrcode);
    switch (response[0]) {
      case "project_not_exists":
        alert("Deze gebruiker bestaat niet");
        break;
      default:
        setUrlMail("https://inf1b.serverict.nl/PmaWEB/pages/add.php?projectid=" + projectId + "%26token=" + response[0].newQrcode);
        setUrlQr("https://inf1b.serverict.nl/PmaWEB/pages/add.php?projectid=" + projectId + "&token=" + response[0].newQrcode)
        setName(response[0].name);
    }
  };

  const onSubmit = (data) => {
    Linking.openURL("mailto:"+ data.email +"?subject=Test&body=Hallo%0D%0ADit is een linkje naar de app " + name + "%0D%0ADe link om deel te nemen aan het project is " + urlMail);
  };

  


  return (
    <SafeAreaView style={Styles.SafeAreaView}>
      <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
      <View>
        <Circle name={"send"} size={50} color={"black"} text={"Uitnodigingen"} />
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

      <View>
        <CustomButton 
          buttonType={"blueButton"}
          buttonText={"buttonText"}
          text={"Uitnodigen"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <View style={styles.QRCode}>
        <Text style={styles.text}>QR-Code:</Text>
        <QRCode
          value={urlQr}
          size={250}
        />
      </View>

      <View>
        <CustomButton 
          buttonType={"redButton"}
          buttonText={"buttonText"}
          text={"Nieuwe Qr-code"}
          onPress={() => generateNewCode(projectId)}
        />
      </View>
    </SafeAreaView>
  );
};

export default InviteMembers;
