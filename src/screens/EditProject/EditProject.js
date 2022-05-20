'use strict';

import { Text, ScrollView, View, TextInput, Pressable, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useValidation } from 'react-native-form-validator';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
// import { set } from 'react-native-reanimated';
// import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';

const EditProject = ()=> {
  //the things where the info goes in.
  const [ProjectNaam, setProjectNaam] = useState('');

  //step 1 to validate things
  const { validate, isFieldInError, getErrorsInField, getErrorMessages, isFormValid } =
  useValidation({
      state: { ProjectNaam},
  });

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

  //set the requirements for the textinput.
  const _onPressButton = () => {
  validate({
    ProjectNaam: { minlength: 3, maxlength: 50, hasNoSpecialCharacter: true, required: true },
  }),
  _checkValidation();
};

  //check if there are no more errors
  const _checkValidation = () => {
    if(isFormValid() == true) {
      console.log("geen errors");
      console.log(ProjectNaam);
      //sendDataToAPI(ProjectNaam);
    } else if (isFormValid() == false) {
      console.log("wel errors");
    }
      else {
        console.log("dikke kutzooi");
    }
  }

  //the screen
return (
    <ScrollView style={styles.root}>
        <MaterialCommunityIcons style={styles.arrow}  name="arrow-left-thick" size={60} color={'black'} />
        <View style={styles.div}>
        <Circle name={"account-group"} size={60} color={"black"} style={[styles.icon,]} />
        </View>
        <View style={styles.div}>
        <Text style={[styles.title, styles.marginBottom25, styles.marginTop50, styles.sampleText,]}>PROJECT BEWERKEN</Text>
        </View>
        <View style={styles.div}> 
        <Text style={[styles.subtitle, styles.sampleText,]}>PROJECTNAAM</Text>
        </View>
        <View style={styles.div}>
        <TextInput style={[styles.textInput,]} onChangeText={setProjectNaam} value={ProjectNaam} placeholder={'PROJECTNAAM'}/>
        </View>
        {isFieldInError('projectNaam' &&
            getErrorsInField('projectNaam').map(ErrorMessage => (
                <Text style={[styles.sampleText]}>{ErrorMessage}</Text>
            )))}
                    <Text style={styles.errorMessage}>{getErrorMessages()}</Text>
        <Pressable onPress={_onPressButton}>
        <Text style={[styles.button, styles.buttonBlue, styles.marginTop25,]}>BEWERKEN</Text>
        </Pressable>
        <Pressable onPress={_onPressButton}>
        <Text style={[styles.button, styles.buttonRed, styles.marginBottom25]}>VERWIJDEREN</Text>
        </Pressable>

        <View>
          <Button style={[styles.button]} title="druk hier" onPress={() => sendDataToAPI(ProjectNaam)} />
        </View>
    </ScrollView>
    );
};
  
export default EditProject;

