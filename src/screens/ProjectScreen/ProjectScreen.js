import React from 'react';
import Styles from './Styles';
import { SafeAreaView } from 'react-native';
import Tile from '../../components/Tile';

export default function ProjectScreen() {

    // temporary hardcode
    const projectId = 23;
    const userId = 519;
    
    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Tile text="Teamcode" image="book" screen="TileTestScreen" projectId={projectId} userId={userId} />
            <Tile text="Planning" image="calendar" screen="LoginScreen" projectId={projectId} userId={userId} />
            <Tile text="Urenverwantwoording" image="clipboard" screen="LoginScreen" projectId={projectId} userId={userId} />
            <Tile text="Waarschuwingen" image="exclamation-thick" screen="LoginScreen" projectId={projectId} userId={userId} />
            <Tile text="Uitnodigingen" image="account-plus" screen="LoginScreen" projectId={projectId} userId={userId} />
            <Tile text="Leden" image="account-group" screen="LoginScreen" projectId={projectId} userId={userId} />
            <Tile text="Scorebord" image="star" screen="LoginScreen" projectId={projectId} userId={userId} />
        </SafeAreaView>
    );
}