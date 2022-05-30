import React from 'react';
import Styles from './Styles';
import { Text, SafeAreaView, ScrollView, Image } from 'react-native';
import Tile from '../../components/Tile/Tile';
import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ShowProjects(){

    // temporary hardcode
    const userId = 1;
    const porjectId = null;    
    
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@user_data')
            if(jsonValue !== null) {
                return JSON.parse(jsonValue);
            }
        } catch(e) {
            alert(e);
        }
    }

    const sendDataToAPI = (userId) => {
        try {
            fetch("http://localhost/ReactNativeAPI/PmaAPI/handlers/showProjects/showProjectsHandler", {
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
            alert("Success");
        } catch (error) {
            alert(error);
        }
    }
  

    return (
        <SafeAreaView style={Styles.Container}>
            <Header GoToType="Add" GoTo="CreateProject" CenterGoTo="None" ReturnType="Home" />
        </SafeAreaView>
    )
}