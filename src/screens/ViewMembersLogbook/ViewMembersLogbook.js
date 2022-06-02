import React from 'react';
import Styles from './Styles';
import { Text, SafeAreaView, ScrollView, Image } from 'react-native';
import Header from '../../components/Header/Header';

export default function ViewMembersLogbook(){

    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" />
        </SafeAreaView>
    )
}