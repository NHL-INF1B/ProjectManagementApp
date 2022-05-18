import { Text, ScrollView, Pressable, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';


const HourEditScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time_start, setTime_Start] = useState('');
  const [time_end, setTime_End] = useState('');

  const sendDataToAPI = (title, description, date, time_start, time_end, user_id, project_id) => {
    try {
        fetch("http://localhost/ReactNativeAPI/PmaAPI/handlers/houredit/houreditHandler.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: description,
                date: date,
                time_start: time_start,
                time_end: time_end,
                user_id: user_id,
                project_id: project_id,
            }),
        })
        .then((response) => response.text())
        // .then((response) => response.json())
        .then((response) => {
            console.log(response);
            // catchFeedback(response);
        });
        alert("dit werkt");
    } catch (error) {
        alert(error);
    }
};

  return (
      <ScrollView style={styles.root}>
          <MaterialCommunityIcons style={styles.arrow}  name="arrow-left" size={60} color={'black'} />
          <Circle name={"clipboard-text"} size={60} color={"#009BAA"} style={styles.icon} />
          <Text style={[styles.title, styles.marginBottom3]}>Urenverantwoording{"\n"}Toevoegen</Text>
          <Text style={styles.subtitle}>Activiteit</Text>
          <CustomTextInput placeholder="Activiteit" value={title} setValue={setTitle} />
          <Text style={styles.subtitle}>Beschrijving</Text>
          <CustomTextInput placeholder="Beschrijving" value={description} setValue={setDescription} />
          <Text style={styles.subtitle}>Datum</Text>
          <CustomTextInput placeholder="Datum" value={date} setValue={setDate} />
          <Text style={styles.subtitle}>Start Tijd</Text>
          <CustomTextInput placeholder="Start Tijd" value={time_start} setValue={setTime_Start} />
          <Text style={styles.subtitle}>Eind Tijd</Text>
          <CustomTextInput style={styles.marginBottom3} placeholder="Eind Tijd" value={time_end} setValue={setTime_End} />
          <Pressable>
              <Text style={[styles.button, styles.buttonBlue, styles.marginTop1, styles.marginBottom3]}>Toevoegen</Text>
          </Pressable>
          <Circle name={"timer"} size={60} color={"#009BAA"} style={styles.icon} />
          <Text style={[styles.title, styles.marginBottom3]}>Timer</Text>
          <Text style={[styles.subtitle, styles.marginBottom3]}>Activiteit</Text>
          <CustomTextInput placeholder="Activiteit" value={title} setValue={setTitle} />
          <Button title="druk hier" style={styles.button} onPress={() => sendDataToAPI("title", "description", "date", "time_start", "time_end", "user_id", "project_id")} />
          {/* <Pressable>
              <Text style={[styles.button, styles.buttonGreen, styles.marginTop1]}>Start</Text>
              <Text style={[styles.button, styles.buttonRed, styles.marginTop1, styles.marginBottom3]}>Stop</Text>
          </Pressable> */}
      </ScrollView>
  );
}

export default HourEditScreen;
  


