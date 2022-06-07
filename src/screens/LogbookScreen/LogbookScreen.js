import React, { useEffect, useState } from 'react';
import Styles from './Styles';
import { Text, SafeAreaView, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header/Header';
import Activity from '../../components/Activity/Activity';
import { useRoute, useIsFocused } from "@react-navigation/native";
import { FlatList } from 'react-native-gesture-handler';

export default function LogbookScreen(){

    const route = useRoute();
    const isFocused = useIsFocused();
    const userId = route.params.userId;
    const projectId = route.params.projectId;
    const selectedUserId = route.params.selectedUserId;
    const viewing = route.params.viewing;
    const [logbook, setLogbook] = useState([]);
    const [role, setRole] = useState([]);
    const [userName, setUserName] = useState([]);
    const roleId = role.role_id;
    const selectedUserName = userName.name;

    useEffect(() => {
        
        getRole(userId, projectId);
        
        if(viewing == "viewing"){
            getUserName(selectedUserId);
            getLogbook(selectedUserId, projectId);
        } else{
            getLogbook(userId, projectId);
            getUserName(userId);
        }
    }, [isFocused]);

    const getRole = (userId, projectId) => {
        fetch("http://localhost/PMA/PmaAPI/handlers/logbook/getRoleIdHandler.php", {
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

    const getLogbook = (userId, projectId) => {
        fetch("http://localhost/PMA/PmaAPI/handlers/logbook/getLogbookDataHandler.php", {
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
            setLogbook(response);
        })
    }

    const getUserName = (userId) => {
        fetch("http://localhost/PMA/PmaAPI/handlers/logbook/getUserNameHandler.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            }),
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            setUserName(response);
        })
    }

    if(roleId == 1 || roleId == 2){
        var CenterGoTo = "SelectLogbookUser";
    } else{
        var CenterGoTo = "None";
    }

    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Header GoToType="Edit" GoTo="HourEditScreen" CenterGoTo={CenterGoTo} ReturnType="Back" projectId={projectId} userId={userId} />

            <Text style={Styles.Title}>URENVERANTWOORDING</Text>
            <Text style={Styles.Subtitle}>{selectedUserName}</Text>

            <FlatList
                data={logbook}
                keyExtractor={(logbook) => logbook.id}
                renderItem={({item}) =>
                    <Activity Name={item.title} Description={item.description} Date={item.date} Start={item.time_start} End={item.time_end} userId={userId} projectId={projectId} />
                }
            />
        </SafeAreaView>
    )
}