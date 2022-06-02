'use strict';

import { Text, ScrollView, View, Button, Platform} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import * as DocumentPicker from "expo-document-picker";

const TeamcodeToevoegen = () => {
const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ 
     type: "application/pdf", 
     copyToCacheDirectory: true })
      .then(response => {
        if (response.type == 'success') {          
          let { name, size, uri } = response;

       / ------------------------/
          if (Platform.OS === "android" && uri[0] === "/") {
             uri = `file://${uri}`;
             uri = uri.replace(/%/g, "%25");
          }
      / ------------------------/

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
      console.log(data);
      console.log(data.uri);
      const url = "inf1b.serverict.nl/Upload";
      const fileUri = data.uri;
      const formData = new FormData();
      formData.append('document', data);
      const options = {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
      };
      console.log(formData);

      fetch(url, options).catch((error) => console.log(error));
  }

  

  //the screen 
return (
    <ScrollView style={styles.root}>
        <MaterialCommunityIcons style={styles.arrow}  name="arrow-left-thick" size={60} color={'black'} />
        <View style={styles.div}>
          <Circle style={[styles.icon]} name={"book"} size={60} color={"black"}  />
        </View>
        <View style={styles.div}>
          <Text style={[styles.title, styles.marginTop50, styles.sampleText,]}>TEAMCODE TOEVOEGEN</Text>
        </View>
        <View style={styles.div}> 
          <Text style={[styles.subtitle, styles.sampleText]}>TEAMCODE</Text>
        </View>
        <View>
          <Button
            style={styles.buttonBlue}
            title="Selecteer Bestand"
            onPress={pickDocument}
          />
        </View>
    </ScrollView>
    )
}
  
export default TeamcodeToevoegen;