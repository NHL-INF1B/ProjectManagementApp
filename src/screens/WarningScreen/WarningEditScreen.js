import { Text, ScrollView, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInputOld from '../../components/CustomTextInput/CustomTextInputOld';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import { TouchableOpacity } from 'react-native-gesture-handler';

const WarningAddScreen = () => {
    const [member, setMember] = useState('');
    const [reason, setReason] = useState('');

    const editWarning = (reason) => {
        try {
            fetch("http://localhost/ReactNativeAPI/PmaAPI/handlers/warning/warningUpdateHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reason: reason,
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

    const deleteWarning = (reason) => {
        try {
            fetch("http://localhost/ReactNativeAPI/PmaAPI/handlers/warning/warningDeleteHandler.php", {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reason: reason,
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
            <Circle name={"alert-circle"} size={60} color={"#009BAA"} style={styles.icon} />
            <Text style={[styles.title, styles.marginBottom5]}>Waarschuwing bewerken</Text>
            <Text style={styles.subtitle}>Projectlid</Text>
            <CustomTextInputOld placeholder="Selecteer projectlid" value={member} setValue={setMember} />
            <Text style={styles.subtitle}>Reden</Text>
            <CustomTextInputOld placeholder="Reden" value={reason} setValue={setReason} />

            <TouchableOpacity 
                style={[styles.button, styles.buttonBlue, styles.marginTop1]} 
                onPress={() => editWarning(reason)}
                activeOpacity={0.6}>
                <Text styles={styles.subtitle}>BEWERKEN</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, styles.buttonRed, styles.marginTop1]} 
                onPress={() => deleteWarning(requestAnimationFrame)}
                activeOpacity={0.6}>
                <Text styles={styles.subtitle}>VERWIJDEREN</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default WarningAddScreen;
  


