import React, { useEffect, useState } from 'react';
import Styles from './Styles';
import { Text, SafeAreaView, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header/Header';
import Activity from '../../components/Activity/Activity';
import { useRoute } from "@react-navigation/native";
import { FlatList } from 'react-native-gesture-handler';

export default function LogbookScreen(){

    const route = useRoute();
    const userId = route.params.userId;
    const projectId = route.params.projectId;
    const [logbook, setLogbook] = useState([]);
    const [role, setRole] = useState([]);
    const [name, setName] = useState();
    const roleId = role.role_id;

    useEffect(() => {
        getLogbook(userId, projectId);
        getRole(userId, projectId);
        
        const data = getData();
        data.then((data) => {
            if (data !== undefined) {
                setName(data["name"]);
            }
        });
    }, []);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@user_data");
            if (jsonValue !== null) {
               return JSON.parse(jsonValue);
            }
        } catch (e) {
            alert(e);
        }
    };

    const getRole = (userId, projectId) => {
        fetch("http://localhost/PMA/PmaAPI/handlers/logbook/getRoleHandler.php", {
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

    if(roleId == 1 || roleId == 2){
        var CenterGoTo = "LogbookScreen";
    } else{
        var CenterGoTo = "None";
    }

    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Header GoToType="Edit" GoTo="HourEditScreen" CenterGoTo={CenterGoTo} ReturnType="Back" />

            <Text style={Styles.Title}>URENVERANTWOORDING</Text>
            <Text style={Styles.Name}>{name}</Text>

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