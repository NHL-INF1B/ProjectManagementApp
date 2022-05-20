import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import Header from '../../components/Header/Header';
import Tile from "../../components/Tile/Tile";

export default function TestFile2() {
    const projectId = 23;
    const userId = 519;
    
    return (
        <SafeAreaView>
            <Header />
            <Text>Hallo</Text>
            <Tile text="Geen teamcode" image="book" screen="ProjectScreen" projectId={projectId} userId={userId} />
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    
});