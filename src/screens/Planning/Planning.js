import { Text, ScrollView, Pressable, View, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';

const Planning = () => {
  const [Activiteit, setActiviteit] = useState('');
  const [weeknummer, setWeeknummer] = useState('');


  const sendDataToAPI = (planning, week, activiteit, project_id) => {
    try {
        fetch("http://localhost:8080/PmaAPI/handlers/planning/planningHandler.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                planning: planning,
                week: week,
                activiteit: activiteit,
                project_id: project_id,
            }),
        })
        .then((response) => response.text())
        // .then((response) => response.json())
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
      <Circle name={"calendar-month"} size={60} color={"Black"} style={styles.icon} />
      <Text style={[styles.title, styles.marginBottom25]}>Planning Toevoegen</Text>
      <Text style={styles.subtitle}>Activiteit</Text>
      <CustomTextInput style={styles.subtitle} placeholder="Activiteit" value={Activiteit} setValue={setActiviteit} />
      <Text style={styles.subtitle}>Weeknummer</Text>
      <CustomTextInput placeholder="Weeknummer" value={weeknummer} setValue={setWeeknummer} />
      <Pressable>
          <Text style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}>Toevoegen</Text>
      </Pressable>
      <View>
        <Button title="druk hier" onPress={() => sendDataToAPI("planning", "week", "activiteit", "project_id")} />
      </View>

      {/* <Button
        title="Toevoegen"
        style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}
        onPress={() =>
        Alert.alert("Test titel", "Test bericht",
        [
          { text: "Toevoegen", onPress: () => console.log("Toevoegen geklikt")}
        ])}

      /> */}


    </ScrollView>
  );
}

export default Planning;
  


