import React from 'react';
import Styles from './Styles';
import { Text, SafeAreaView, ScrollView, Image } from 'react-native';
import Tile from '../../components/Tile/Tile';

export default function ProjectScreen() {

    // temporary hardcode
    const projectId = 23;
    const userId = 519;
    const projectName = "Innovate";
    
    return (
        <ScrollView>
            <SafeAreaView style={Styles.Container}>
                <Image style={Styles.Img} source={require("../../assets/images/logo.png")} />
                <Text style={Styles.ProjectName}>{projectName}</Text>
                <SafeAreaView style={Styles.Tiles}>
                    <Tile text="Teamcode" image="book" screen="TeamcodeScreen" projectId={projectId} userId={userId} />
                    <Tile text="Planning" image="calendar" screen="PlanningScreen" projectId={projectId} userId={userId} />
                    <Tile text="Urenverwantwoording" image="clipboard" screen="LogbookScreen" projectId={projectId} userId={userId} />
                    <Tile text="Waarschuwingen" image="exclamation-thick" screen="WarningScreen" projectId={projectId} userId={userId} />
                    <Tile text="Uitnodigingen" image="account-plus" screen="InviteScreen" projectId={projectId} userId={userId} />
                    <Tile text="Leden" image="account-group" screen="MemberScreen" projectId={projectId} userId={userId} />
                    <Tile text="Scorebord" image="star" screen="ScoreScreen" projectId={projectId} userId={userId} />
                </SafeAreaView>
            </SafeAreaView>
        </ScrollView>
    );
}