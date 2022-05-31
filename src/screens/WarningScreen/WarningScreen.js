import {React, useEffect, useState} from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import Warning from '../../components/Warning/Warning';
import Styles from "./Styles";

const WarningScreen = ({ navigation }) => {
    const [warnings, setWarnings] = useState([]);

    useEffect(() => {
        readData(1); //Hier moet de user komen die daadwerkelijk is meegestuurd
    }, []);

    const readData = (projectId) => {
        fetch('http://localhost/pma/PmaAPI/handlers/warning/warninghandler.php', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectId: projectId,
            })
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            setWarnings(response);
        })
    };

    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <FlatList 
                data={warnings}
                keyExtractor={(warning) => warning.id.toString()}
                renderItem={({ item }) => 
                    <Warning 
                        person={item.user_id} 
                        reason={item.reason} 
                    />
                }
            />
        </SafeAreaView>
    );
}

export default WarningScreen;