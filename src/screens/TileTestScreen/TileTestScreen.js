import React from 'react';
import Styles from './Styles';
import { View, Text, SafeAreaView } from 'react-native';
import Tile from '../../components/Tile';
import { useRoute } from '@react-navigation/native';

export default function TileTestScreen() {

    const route = useRoute();
    
    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Tile text="Go back" image="airplane" screen="ProjectScreen" />
            {/* <Text>ProjectId: {route.params.projectId}</Text>
            <Text>UserId: {route.params.userId}</Text> */}
        </SafeAreaView>
    );
}