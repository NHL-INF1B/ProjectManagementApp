import { Text, ScrollView, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInputOld from '../../components/CustomTextInput/CustomTextInputOld';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import { TouchableOpacity } from 'react-native-gesture-handler';


const HourEditScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time_start, setTime_Start] = useState('');
    const [time_end, setTime_End] = useState('');

    const editActivity = (title, description, date, time_start, time_end) => {
        try {
            fetch("http://localhost/ReactNativeAPI/PmaAPI/handlers/houredit/houreditUpdateHandler.php", {
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
                }),
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                // catchFeedback(response);
            });
        } catch (error) {
            alert(error);
        }
    };

    const deleteActivity = (title, description, date, time_start, time_end) => {
        try {
            fetch("http://localhost/ReactNativeAPI/PmaAPI/handlers/houredit/houreditDeleteHandler.php", {
                method: "DELETE",
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
                }),
            })
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
            <MaterialCommunityIcons style={styles.arrow}  name="" size={60} color={'black'} />
            <Circle name={"alert-circle"} size={60} color={"#000000"} style={styles.icon} />
            <Text style={[styles.title, styles.marginBottom5]}>Urenverantwoording{"\n"}bewerken</Text>
            <Text style={styles.subtitle}>Activiteit</Text>
            <CustomTextInputOld placeholder="Activiteit" value={title} setValue={setTitle} />
            <Text style={styles.subtitle}>Beschrijving</Text>
            <CustomTextInputOld placeholder="Beschrijving" value={description} setValue={setDescription} />
            <Text style={styles.subtitle}>Datum</Text>
            <CustomTextInputOld placeholder="Datum" value={date} setValue={setDate} />
            <Text style={styles.subtitle}>Start Tijd</Text>
            <CustomTextInputOld placeholder="Start Tijd" value={time_start} setValue={setTime_Start} />
            <Text style={styles.subtitle}>Eind Tijd</Text>
            <CustomTextInputOld style={styles.marginBottom5} placeholder="Eind Tijd" value={time_end} setValue={setTime_End} />

            <TouchableOpacity 
                style={[styles.button, styles.buttonBlue, styles.marginTop1]} 
                onPress={() => editActivity(title, description, date, time_start, time_end)}
                activeOpacity={0.6}>
                <Text styles={styles.subtitle}>BEWERKEN</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, styles.buttonRed, styles.marginTop1]} 
                onPress={() => deleteActivity(title, description, date, time_start, time_end)}
                activeOpacity={0.6}>
                <Text styles={styles.subtitle}>VERWIJDEREN</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default HourEditScreen;
  


