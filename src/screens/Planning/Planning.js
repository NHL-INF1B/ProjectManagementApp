'use strict';

import { Text, ScrollView, Pressable, View, Button, TextInput} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import { useValidation} from 'react-native-form-validator';

export default function PlanningScreen() {
  const [Activiteit, setActiviteit] = useState('');
  const [Weeknummer, setWeeknummer] = useState('');
  //const [PlanningNaam, setPlanningNaam] = useState('');


  const sendDataToAPI = (activiteit, week, project_id) => {
    try {
        fetch("http://localhost:8080/PmaAPI/handlers/planning/planningHandler.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
               // planning: planning,
                week: week,
                activiteit: activiteit,
                project_id: project_id,
            }),
        })
     //.then((response) => response.text())
      .then((response) => response.json())
        .then((response) => {
            console.log(response);
            // catchFeedback(response);
        });
    } catch (error) {
        alert(error);
    }
};

const { validate, isFieldInError, getErrorsInField, getErrorMessages, isFormValid } =
  useValidation({
      state: { Activiteit, Weeknummer},
  });

  // const _checkValidation = () => {
  //   if(isFormValid() == true) {
  //     console.log("geen errors");
  //     //sendDataToAPI();
  //   } else if (isFormValid() == false) {
  //     console.log("wel errors");
  //   }
  // }

  const _onPressButton = () => {
    validate({
      Activiteit: { minlength: 3, maxlength: 50, hasNoSpecialCharacter: true, required: true },
      Weeknummer: { minlength: 1, maxlength: 2, hasNoSpecialCharacter: true, required: true, numbers: true},
    }),
    _checkValidation();
  };

  return (
    <ScrollView style={styles.root}>
      <MaterialCommunityIcons style={styles.arrow}  name="arrow-left-thick" size={60} color={'black'} />
      <Circle name={"calendar-month"} size={60} color={"Black"} style={styles.icon} />
      <Text style={[styles.title, styles.marginBottom25]}>Planning Toevoegen</Text>
      <Text style={styles.subtitle}>Activiteit</Text>
      <TextInput style={styles.textInput} onChangeText={setActiviteit} placeholder="Activiteit" value={Activiteit}  />
      {isFieldInError('Activiteit') &&
            getErrorsInField('Activiteit').map(ErrorMessage => (
                <Text style={[styles.sampleText]}>{ErrorMessage}</Text>
            ))}

      <Text style={styles.subtitle}>Weeknummer</Text>
      <TextInput style={styles.textInput} onChangeText={setWeeknummer} placeholder="Weeknummer" value={Weeknummer}  />
      {isFieldInError('Weeknummer') &&
            getErrorsInField('Weeknummer').map(ErrorMessage => (
                <Text style={[styles.sampleText]}>{ErrorMessage}</Text>
            ))}

        <Pressable onPress={_onPressButton}>
        <Text style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}>Aanmaken</Text>
        </Pressable>
      <View>
        <Button title="druk hier" onPress={() => sendDataToAPI(Activiteit, Weeknummer)} />
      </View>


    </ScrollView>
  );
}

// export default PlanningScreen;