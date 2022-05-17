import React from 'react';
import Styles from './Styles';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Tile from '../../components/Tile';

export default function ProjectScreen() {
    
    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Tile text="Teamcode" image="book" path="../LoginScreen/LoginScreen" />
            <Tile text="Planning" image="calendar" path="../LoginScreen/LoginScreen" />
            <Tile text="Urenverwantwoording" image="clipboard" path="../LoginScreen/LoginScreen" />
            <Tile text="Waarschuwingen" image="exclamation-thick" path="../LoginScreen/LoginScreen" />
            <Tile text="Uitnodigingen" image="account-plus" path="../LoginScreen/LoginScreen" />
            <Tile text="Leden" image="account-group" path="../LoginScreen/LoginScreen" />
            <Tile text="Scorebord" image="star" path="../LoginScreen/LoginScreen" />
        </SafeAreaView>
    );
}