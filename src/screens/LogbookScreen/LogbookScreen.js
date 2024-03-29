import React, { useEffect, useState } from 'react';
import Styles from './Styles';
import { Text, SafeAreaView } from 'react-native';
import Header from '../../components/Header/Header';
import Activity from '../../components/Activity/Activity';
import { useRoute, useIsFocused } from "@react-navigation/native";
import { FlatList } from 'react-native-gesture-handler';
import handlerPath from '../../../env';

export default function LogbookScreen(){

    //declaring the const
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

    //happens when the page opens.
    useEffect(() => {
        
        //check if the user is viewing the logbook of an other user or not
        if(viewing == "viewing"){
            getUserName(selectedUserId);
            getLogbook(selectedUserId, projectId);
        } else{
            getRole(userId, projectId);
            getLogbook(userId, projectId);
            getUserName(userId);
        }
    }, [isFocused]);

    //get the role of the user.
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
            setRole(response);
        })
    }

    //get the logbook of the user.
    const getLogbook = (userId, projectId) => {
        fetch(handlerPath + "logbook/getLogbookDataHandler.php", {
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
            setLogbook(response);
        })
    }

    //get the username of the user.
    const getUserName = (userId) => {
        fetch(handlerPath + "logbook/getUserNameHandler.php", {
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
            setUserName(response);
        })
    }

    //check if the user is voorzitter or vice voorzitter.
    if(roleId == 1 || roleId == 2){
        var CenterGoTo = "SelectLogbookUser";
    } else{
        var CenterGoTo = "None";
    }

    //check if there is any data to show.
    function checkData(logbook){
        if(logbook == "NO_DATA"){
            return(<Text style={Styles.nothingFound}>Er zijn nog geen uren genoteerd</Text>);
        } else{
            return(<FlatList
                data={logbook}
                keyExtractor={(logbook) => logbook.id}
                renderItem={({item}) =>
                    <Activity id={item.id} Name={item.title} Description={item.description} Date={item.date} Start={item.time_start} End={item.time_end} userId={userId} projectId={projectId} />
                }
            />);
        }
    }

    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Header GoToType="Add" GoTo="HourAddScreen" CenterGoTo={CenterGoTo} ReturnType="Back" projectId={projectId} userId={userId} />

            <Text style={Styles.title}>URENVERANTWOORDING</Text>
            <Text style={Styles.subtitle}>{selectedUserName}</Text>

            {checkData(logbook)}
            
        </SafeAreaView>
    )
}
