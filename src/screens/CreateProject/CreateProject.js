'use strict';

import { Text, ScrollView, View, TextInput, Pressable, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import { set } from 'react-native-reanimated';
// import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';

const CreateProject = ()=> {
  //the things where the info goes in.
  const [ProjectNaam, setProjectNaam] = useState('');

  const sendDataToAPI = (ProjectNaam) => {
    try {
        fetch("http://localhost/pma/PmaAPI/handlers/createProject/createProjectHandler.php", {
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

  //the screen
return (
    <ScrollView style={styles.root}>
        <MaterialCommunityIcons style={styles.arrow}  name="arrow-left-thick" size={60} color={'black'} />
        <View style={styles.div}>
        <Circle name={"account-group"} size={60} color={"black"} style={[styles.icon,]} />
        </View>
        <View style={styles.div}>
        <Text style={[styles.title, styles.marginBottom25, styles.marginTop50, styles.sampleText,]}>PROJECT AANMAKEN</Text>
        </View>
        <View style={styles.div}> 
        <Text style={[styles.subtitle, styles.sampleText,]}>PROJECTNAAM</Text>
        </View>
        <View style={styles.div}>
        <TextInput style={[styles.textInput,]} onChangeText={setProjectNaam} value={ProjectNaam} placeholder={'PROJECTNAAM'}/>
        </View>
        <Pressable onPress={() => sendDataToAPI(ProjectNaam)}>
        <Text style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}>AANMAKEN</Text>
        </Pressable>
    </ScrollView>
    );
};
  
export default CreateProject;