import { Text, ScrollView, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import { TouchableOpacity } from 'react-native-gesture-handler';

const WarningAddScreen = () => {
    const [member, setMember] = useState('');
    const [reason, setReason] = useState('');

    const editWarning = (reason, user_id, project_id) => {
        try {
            fetch("http://localhost/ReactNativeAPI/PmaAPI/handlers/warning/warningUpdateHandler.php", {
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
            alert("dit werkt hopelijk aub");
        } catch (error) {
            alert(error);
        }
    };

    const deleteWarning = (reason, user_id, project_id) => {
        try {
            fetch("http://localhost/ReactNativeAPI/PmaAPI/handlers/warning/warningDeleteHandler.php", {
                method: "DELETE",
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
            alert("dit werkt toch");
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
            <CustomTextInput placeholder="Selecteer projectlid" value={member} setValue={setMember} />
            <Text style={styles.subtitle}>Reden</Text>
            <CustomTextInput placeholder="Reden" value={reason} setValue={setReason} />
            {/* <View style={[styles.dropdown, styles.marginTop5 ]}>
            </View> */}

            <TouchableOpacity 
                style={[styles.button, styles.buttonBlue, styles.marginTop1]} 
                onPress={() => editWarning(reason, "user_id", "project_id")}
                activeOpacity={0.6}>
                <Text styles={styles.subtitle}>BEWERKEN</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, styles.buttonRed, styles.marginTop1]} 
                onPress={() => deleteWarning(reason, "user_id", "project_id")}
                activeOpacity={0.6}>
                <Text styles={styles.subtitle}>VERWIJDEREN</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default WarningAddScreen;
  


