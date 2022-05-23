import { Text, ScrollView, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HourEditScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time_start, setTime_Start] = useState('');
    const [time_end, setTime_End] = useState('');
    const [title2, setTitle2] = useState('');
    const [description2, setDescription2] = useState('');
  
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
            .then((response) => response.json())
            alert("dit werkt");
        } catch (error) {
            alert(error);
        }
    };
    //Saves the current timestamp & inserts it into the database as the start_time along with the other data via the handler file
    const startTimer = (title, description, user_id, project_id) => {
        try {
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            setDate(date);
            let time_start = new Date().toLocaleString();
            fetch("http://localhost/ReactNativeAPI/PmaAPI/handlers/houredit/houreditStartHandler.php", {
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
                    user_id: user_id,
                    project_id: project_id,
                }),
            })
            .then((response) => response.json())
            alert("dit werkt ook");
        } catch (error) {
            alert(error);
        }
    };
    //Saves the current timestamp & updates it into the database as the end_time via the handler file
    const stopTimer = (title, description, user_id, project_id) => {
        try {
            let time_end = new Date();
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
                    time_end: time_end,
                    user_id: user_id,
                    project_id: project_id,
                }),
            })
            .then((response) => response.json())
            alert("dit werkt half");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <ScrollView style={styles.root}>
            <MaterialCommunityIcons style={styles.arrow}  name="arrow-left" size={60} color={'black'} />
            <Circle name={"clipboard-text"} size={60} color={"#009BAA"} style={styles.icon} />
            <Text style={[styles.title, styles.marginBottom5]}>Urenverantwoording{"\n"}Toevoegen</Text>
            <Text style={styles.subtitle}>Activiteit</Text>
            <CustomTextInput placeholder="Activiteit" value={title} setValue={setTitle} />
            <Text style={styles.subtitle}>Beschrijving</Text>
            <CustomTextInput placeholder="Beschrijving" value={description} setValue={setDescription} />
            <Text style={styles.subtitle}>Datum</Text>
            <CustomTextInput placeholder="Datum" value={date} setValue={setDate} />
            <Text style={styles.subtitle}>Start Tijd</Text>
            <CustomTextInput placeholder="Start Tijd" value={time_start} setValue={setTime_Start} />
            <Text style={styles.subtitle}>Eind Tijd</Text>
            <CustomTextInput style={styles.marginBottom5} placeholder="Eind Tijd" value={time_end} setValue={setTime_End} />
            <View style={styles.marginBottom1}></View>
            <TouchableOpacity 
                style={[styles.button, styles.buttonBlue]} 
                onPress={() => sendDataToAPI(title, description, date, time_start, time_end, "user_id", "project_id")}
                activeOpacity={0.6}>
                <Text>TOEVOEGEN</Text>
            </TouchableOpacity>
            <View style={styles.marginBottom5}></View>
            <Circle name={"timer"} size={60} color={"#009BAA"} style={styles.icon} />
            <Text style={[styles.title, styles.marginBottom5]}>Timer</Text>
            <Text style={styles.subtitle}>Activiteit</Text>
            <CustomTextInput placeholder="Activiteit" value={title2} setValue={setTitle2} />
            <Text style={styles.subtitle}>Beschrijving</Text>
            <CustomTextInput placeholder="Beschrijving" value={description2} setValue={setDescription2} />
            <View style={styles.marginBottom1}></View>
            <TouchableOpacity 
                style={[styles.button, styles.buttonGreen]} 
                onPress={() => startTimer(title2, description2, date, time_start, "user_id", "project_id")}
                activeOpacity={0.6}>
                <Text>START</Text>
            </TouchableOpacity>
            <View style={styles.marginBottom1}></View>
            <TouchableOpacity 
                style={[styles.button, styles.buttonRed]} 
                onPress={() => stopTimer(title2, description2, date, time_end, "user_id", "project_id")}
                activeOpacity={0.6}>
                <Text styles={styles.subtitle}>STOP</Text>
            </TouchableOpacity>
            <View style={styles.marginBottom1}></View>
        </ScrollView>
    );
}

export default HourEditScreen;
  


