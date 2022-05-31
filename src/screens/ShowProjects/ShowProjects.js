import React, { useEffect } from 'react';
import Styles from './Styles';
import { Text, SafeAreaView, ScrollView, Image } from 'react-native';
import Tile from '../../components/Tile/Tile';
import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ShowProjects(){

    var userId = 2;
    const [id, setId] = useState("-");
    const [name, setName] = useState("-");
    const [roles, setRoles] = useState("-");

    useEffect(() => {
        getData(userId)
    }, []);
    
    // const getData = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('@user_data')
    //         if(jsonValue !== null) {
    //             return JSON.parse(jsonValue);
    //         }
    //     } catch(e) {
    //         alert(e);
    //     }
    // }

    const getData = (userId) => {
        try {
            fetch("http://localhost/PMA/PmaAPI/handlers/showProjects/showProjectsHandler", {
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
                catchFeedback(response);
            })
        } catch (error) {
            alert(error);
        }
    }

    const catchFeedback = (response) => {
        console.log(response);
        
        switch(response[0]){
            case "":
                alert("Geen projecten gevonden");
                break;
            default:
                setId(response.project_id);
                setName(response.name);
                setRoles(response.role_id);
        }
    }
  

    return (
        <SafeAreaView style={Styles.Container}>
            <Header GoToType="Add" GoTo="CreateProject" CenterGoTo="None" ReturnType="Home" />
        </SafeAreaView>
    )
}