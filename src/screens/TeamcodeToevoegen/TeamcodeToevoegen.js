import {
  Text,
  ScrollView,
  View,
  Button,
  Platform,
  SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import styles from "./Styles";
import Circle from "../../components/Circle/Circle";
import { useForm, Controller } from "react-hook-form";
import CustomButton from "../../components/CustomButton/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import Header from "../../components/Header/Header";
import { useRoute } from "@react-navigation/native";

const TeamcodeToevoegen = () => {
  const route = useRoute();
  const userId = route.params.userId;
  const projectId = route.params.projectId;

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    }).then((response) => {
      if (response.type == "success") {
        let { name, size, uri } = response;

        if (Platform.OS === "android" && uri[0] === "/") {
          uri = `file://${uri}`;
          uri = uri.replace(/%/g, "%25");
        }

        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType,
        };

        postDocument(fileToUpload);
      }
    });
  };

  const postDocument = (data) => {
    console.log(data);
    console.log(data.uri);
    const fileUri = data.uri;
    const formData = new FormData();
    formData.append("document", data);
    console.log(formData);

    try {
      fetch("http://localhost/PMA/PmaAPI/handlers/teamcode/teamcodeAdd.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64: data.uri,
          projectid: projectId,
        }),
      })
        // .then((response) => response.text())
        .then((response) => response.json())
        .then((response) => {
          alert("Teamcode geupload");
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView style={styles.root}>
        <Header
          GoToType=""
          GoTo=""
          CenterGoTo="None"
          ReturnType="Back"
          projectId={projectId}
          userId={userId}
        />
        <View style={styles.div}>
          <Circle
            style={[styles.icon]}
            name={"book"}
            size={60}
            color={"black"}
          />
        </View>
        <View style={styles.div}>
          <Text style={[styles.title, styles.marginTop50, styles.sampleText]}>
            TEAMCODE TOEVOEGEN
          </Text>
        </View>
        <View style={styles.div}>
          <Text style={[styles.subtitle, styles.sampleText]}>TEAMCODE</Text>
        </View>
        <View style={styles.marginContainer}>
          <CustomButton
            buttonType={"blueButton"}
            text={"Selecteer Bestand"}
            onPress={pickDocument}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeamcodeToevoegen;
