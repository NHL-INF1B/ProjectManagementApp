import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar } from 'react-native';
import Tile from "../../components/Tile/Tile";
import Header from '../../components/Header/Header';

export default function TestFile() {

    const projectId = 10;
    const userId = 10;
    
    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Header />
            <Tile text="Teamcode" image="book" screen="TestFile2" projectId={projectId} userId={userId} />
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    SafeAreaView: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: "#009BAA",
    }
})