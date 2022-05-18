import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView } from 'react-native';
import Tile from './../../components/Tile/Tile';
import Styles from './Styles';


export default function WelcomeScreen() {
  return (
        <SafeAreaView style={Styles.container}>
            <Image 
                style={Styles.img}
                source={require('./../../assets/images/logo.png')}
            />
            <SafeAreaView style={Styles.safeAreaView}>
                <Tile text="Projecten" image="account-group" screen="ProjectScreen" projectId={projectId} userId={userId} />
                <Tile text="Profiel" image="card-account-details" screen="LoginScreen" projectId={projectId} userId={userId} />
                <Tile text="Uitloggen" image="logout" screen="LogoutScreen" projectId={projectId} userId={userId} />
            <StatusBar style="auto" />
            </SafeAreaView>
        </SafeAreaView>
  );
};



