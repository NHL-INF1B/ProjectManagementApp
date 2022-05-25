import React from 'react';
import Styles from './Styles';
import { Text, SafeAreaView, ScrollView, Image } from 'react-native';
import Tile from '../../components/Tile/Tile';
import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ShowProjects(){
    
    
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
  

    return (
        <SafeAreaView style={Styles.Container}>
            <Header GoToType="Add" GoTo="CreateProject" CenterGoTo="None" ReturnType="Home" />
        </SafeAreaView>
    )
}