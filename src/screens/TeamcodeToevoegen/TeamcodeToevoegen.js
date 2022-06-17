import { ScrollView, View, Platform, SafeAreaView } from 'react-native';
import { useRoute } from "@react-navigation/native";
import React from 'react';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import CustomButton from '../../components/CustomButton/CustomButton';
import Header from '../../components/Header/Header';
import * as DocumentPicker from 'expo-document-picker';
import handlerPath from '../../../env';

const TeamcodeToevoegen = () => {
  const route = useRoute();
  const projectId = route.params.projectId;
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true
    })
    .then(response => {
      if (response.type == 'success') {
        let { name, size, uri } = response;

        if (Platform.OS === "android" && uri[0] === "/") {
          uri = `file://${uri}`;
          uri = uri.replace(/%/g, "%25");
        }

        let nameParts = name.split('.');
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType
        };

        postDocument(fileToUpload);
      }
    });
  }

  const postDocument = (data) => {
    const formData = new FormData();
    formData.append('document', data);

    try {
      fetch(handlerPath + "teamcode/teamcodeAdd.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64: data.uri,
          projectid: projectId
        }),
      })
      .then((response) => response.json())
      .then((response) => {
        alert('De teamcode is geüpload');
      });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" />
      <ScrollView style={styles.root}>
        <View style={styles.marginBottom25}>
          <Circle name={"book"} size={60} color={"#000000"} text={"Teamcode Toevoegen"} />
        </View>
        <View>
          <CustomButton 
            buttonType={"blueButton"}
            buttonText={"buttonText"}
            text={"Selecteer bestand"}
            onPress={pickDocument}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TeamcodeToevoegen;