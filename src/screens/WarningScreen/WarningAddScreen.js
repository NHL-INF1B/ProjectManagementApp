import { Text, ScrollView, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import handlerPath from '../../../env';
// import SelectDropdown from 'react-native-select-dropdown';

const WarningAddScreen = () => {
    const [member, setMember] = useState('');
    const [reason, setReason] = useState('');
  
    const sendDataToAPI = (reason, user_id, project_id) => {
        try {
            fetch(handlerPath + "warning/warningInsertHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reason: reason,
                    user_id: user_id,
                    project_id: project_id,
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
            <MaterialCommunityIcons style={styles.arrow}  name="arrow-left" size={60} color={'black'} />
            <Circle name={"alert-circle"} size={60} color={"#009BAA"} style={styles.icon} />
            <Text style={[styles.title, styles.marginBottom5]}>Waarschuwing toekennen</Text>
            <Text style={styles.subtitle}>Projectlid</Text>
            <CustomTextInput placeholder="Selecteer projectlid" value={member} setValue={setMember} />
            <Text style={styles.subtitle}>Reden</Text>
            <CustomTextInput placeholder="Reden" value={reason} setValue={setReason} />
            
            <TouchableOpacity 
                style={[styles.button, styles.buttonRed, styles.marginTop5]} 
                onPress={() => sendDataToAPI(reason, "user_id", "project_id")}
                activeOpacity={0.6}>
                <Text styles={styles.subtitle}>TOEKENNEN</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default WarningAddScreen;
  


