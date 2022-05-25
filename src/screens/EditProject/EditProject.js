'use strict';

import { Text, ScrollView, View, TextInput, Pressable,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
// import { set } from 'react-native-reanimated';
// import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';

const EditProject = ()=> {
  //the things where the info goes in.
  const [ProjectNaam, setProjectNaam] = useState('');

  const sendDataToAPI = (ProjectNaam) => {
    try {
        fetch("http://localhost/pma/PmaAPI/handlers/editProject/editProjectHandler.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: ProjectNaam,
            }),
        })
        .then((response) => response.json())
        .then((response) => console.log(response));
    } catch (error) {
        alert(error);
    }
};

  const deleteDataFromAPI = (ProjectNaam) => {
    try {        
        fetch("http://localhost/pma/PmaAPI/handlers/editProject/deleteProjectHandler.php", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: ProjectNaam,
            }),
        })
        .then((response) => response.json())
        .then((response) => console.log(response));
    } catch (error) {
        alert(error);
    }
};


  //the screen
return (
    <ScrollView style={styles.root}>
        <MaterialCommunityIcons style={styles.arrow}  name="arrow-left-thick" size={60} color={'black'} />
        <View style={styles.div}>
        <Circle style={[styles.icon]} name={"account-group"} size={60} color={"black"}  />
        </View>
        <View style={styles.div}>
        <Text style={[styles.title, styles.marginBottom25, styles.marginTop50, styles.sampleText,]}>PROJECT BEWERKEN</Text>
        </View>
        <View style={styles.div}> 
        <Text style={[styles.subtitle, styles.sampleText,]}>PROJECTNAAM</Text>
        </View>
        <View style={[styles.div, styles.marginBottom25]}>
        <TextInput style={[styles.textInput,]} onChangeText={setProjectNaam} value={ProjectNaam} placeholder={'PROJECTNAAM'}/>
        </View>
        <Pressable onPress={() => sendDataToAPI(ProjectNaam)}>
        <Text style={[styles.button, styles.buttonBlue,]}>BEWERKEN</Text>
        </Pressable>
        <Pressable onPress={() => deleteDataFromAPI(ProjectNaam)} value={ProjectNaam}>
        <Text style={[styles.button, styles.buttonRed, styles.marginBottom25]}>VERWIJDEREN</Text>
        </Pressable>
    </ScrollView>
    );
};
  
export default EditProject;

