'use strict';

import { Text, ScrollView, Pressable, View, Button, TextInput} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';

const Planning = () => {
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


  return (
    <ScrollView style={styles.root}>
      <MaterialCommunityIcons style={styles.arrow}  name="arrow-left-thick" size={60} color={'black'} />
      <View style={[styles.div, styles.marginBottom50]}>
      <Circle name={"calendar-month"} size={60} color={"Black"} style={styles.icon} />
      </View>
      <View style={styles.div}>
      <Text style={[styles.title, styles.marginBottom25]}>Planning Toevoegen</Text>
      </View>
      <View style={styles.div}>
      <Text style={styles.subtitle}>ACTIVITEIT</Text>
      </View>
      <View style={styles.div}>
      <TextInput style={styles.textInput} onChangeText={setActiviteit} placeholder="Activiteit" value={Activiteit}  />
      </View>
      <View style={styles.div}>
      <Text style={styles.subtitle}>WEEKNUMMER</Text>
      </View>
      <View style={styles.div}>
      <TextInput style={styles.textInput} onChangeText={setWeeknummer} placeholder="Weeknummer" value={Weeknummer}  />
      </View>
        <Pressable onPress={() => sendDataToAPI(Activiteit, Weeknummer)}>
        <Text style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}>Aanmaken</Text>
        </Pressable>


    </ScrollView>
  );
}

export default Planning;