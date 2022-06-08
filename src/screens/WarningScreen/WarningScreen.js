import {React, useEffect, useState} from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import Warning from '../../components/Warning/Warning';
import Styles from "./Styles";
import { useRoute } from "@react-navigation/native";
import Header from '../../components/Header/Header';

const WarningScreen = ({ navigation }) => {
    const route = useRoute();
    const userId = route.params.userId;
    const projectId = route.params.projectId;

    const [warnings, setWarnings] = useState([]);

    useEffect(() => {
        readData(projectId);
        getRole(userId, projectId);
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

    const [role, setRole] = useState([]);
    const roleId = role.role_id;
    const getRole = (userId, projectId) => {
        fetch("http://localhost/PMA/PmaAPI/handlers/permissions/getRoleIdHandler.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                projectId: projectId,
            }),
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            setRole(response);
        })
    }

    if(roleId == 1 || roleId == 2){
        var GoToType = "Add";
        var GoTo = "AddWarningScreen";
    } else{
        var GoToType = "None";
        var GoTo = "None";
    }

    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Header GoToType={GoToType} GoTo={GoTo} CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
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