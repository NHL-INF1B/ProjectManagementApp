import {React, useEffect, useState} from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import Warning from '../../components/Warning/Warning';
import Styles from "./Styles";
import { useRoute } from "@react-navigation/native";

const WarningScreen = ({ navigation }) => {
    const route = useRoute();
    const projectId = route.params.projectId;

    const [warnings, setWarnings] = useState([]);

    useEffect(() => {
        readData(projectId);
    }, []);

    const readData = (projectId) => {
        fetch('https://inf1b.serverict.nl/handlers/warning/warninghandler.php', {
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