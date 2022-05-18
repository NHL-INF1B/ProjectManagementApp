import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tile from './../../components/Tile/Tile';
import Styles from './Styles';

export default function WelcomeScreen() {
  return (
        <SafeAreaView style={Styles.container}>
            <Image 
                style={Styles.img}
                source={require('./../../assets/images/logo.png')}
            />
            <Text style={Styles.welkom}>Welkom, jsonValue</Text>
            <SafeAreaView style={Styles.safeAreaView}>
                <Tile text="Projecten" image="account-group" screen="ProjectScreen" projectId={projectId} userId={userId} />
                <Tile text="Profiel" image="card-account-details" screen="ProfileScreen" projectId={projectId} userId={userId} />
                <Tile text="Uitloggen" image="logout" screen="LoginScreen" projectId={projectId} userId={userId} />
            <StatusBar style="auto" />
            </SafeAreaView>
        </SafeAreaView>
  );
};

// Data ophalen
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

// Data verwijderen 
removeFew = async () => {
    const keys = ['','']
    try {
        await AsyncStorage.multiRemove(keys)
    } catch(e) {
        alert(e);
    }
};