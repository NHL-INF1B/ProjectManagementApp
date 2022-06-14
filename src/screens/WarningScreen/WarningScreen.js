import {React, useEffect, useState} from 'react';
import { Text, SafeAreaView, FlatList } from 'react-native';
import Warning from '../../components/Warning/Warning';
import Styles from "./Styles";
import { useRoute } from "@react-navigation/native";
import Header from '../../components/Header/Header';
import handlerPath from '../../../env';

const WarningScreen = ({ navigation }) => {
    const route = useRoute();
    const projectId = route.params.projectId;
    const userId = route.params.userId;
    
    const [role, setRole] = useState([]);
    const roleId = role.role_id;

    const [warnings, setWarnings] = useState([]);

    useEffect(() => {
        readData(projectId);
        getRole(userId, projectId)
    }, []);

    const readData = (projectId) => {
        fetch(handlerPath + 'warning/warninghandler.php', {
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

    const getRole = (userId, projectId) => {
        fetch(handlerPath + "permissions/getRoleIdHandler.php", {
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
        var GoTo = "WarningAddScreen";
    } else{
        var GoToType = "None";
        var GoTo = "None";
    }

    function checkData(warnings){
        if(warnings == "NO_DATA"){
            return(<Text style={Styles.nothingFound}>Iedereen gedraagt zich gewoon</Text>)
        } else{
            return(<FlatList 
                data={warnings}
                keyExtractor={(warning) => warning.id.toString()}
                renderItem={({ item }) => 
                    <Warning 
                        person={item.user_id} 
                        reason={item.reason} 
                    />
                }
            />)
        }
    }

    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Header GoToType={GoToType} GoTo={GoTo} CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />

            {checkData(warnings)}
            
        </SafeAreaView>
    );
}

export default WarningScreen;