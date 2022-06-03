import React from 'react';
import Styles from './Styles';
import { Text, SafeAreaView, ScrollView, Image, View } from 'react-native';
import Tile from '../../components/Tile/Tile';
import Header from '../../components/Header/Header';
import { useRoute } from "@react-navigation/native";

export default function ProjectScreen() {

    const route = useRoute();
    const projectId = route.params.projectId;
    const userId = route.params.userId;

    // temporary hardcode
    const projectName = "moet nog dynamisch";
    
    return (
        <ScrollView bounces={false}>
            <SafeAreaView style={Styles.Container}>
                <Header GoToType="Edit" GoTo="EditProject" CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
                <Image style={Styles.Img} source={require("../../assets/images/logo.png")} />
                <Text style={Styles.ProjectName}>{projectName}</Text>
                <View style={Styles.Tiles}>
                    <Tile text="Teamcode" image="book" screen="TeamcodeScreen" projectId={projectId} userId={userId} />
                    <Tile text="Planning" image="calendar" screen="PlanningScreen" projectId={projectId} userId={userId} />
                    <Tile text="Urenverwantwoording" image="clipboard" screen="LogbookScreen" projectId={projectId} userId={userId} />
                    <Tile text="Waarschuwingen" image="exclamation-thick" screen="WarningScreen" projectId={projectId} userId={userId} />
                    <Tile text="Uitnodigingen" image="account-plus" screen="InviteMembers" projectId={projectId} userId={userId} />
                    <Tile text="Leden" image="account-group" screen="MemberScreen" projectId={projectId} userId={userId} />
                    <Tile text="Scorebord" image="star" screen="ScoreScreen" projectId={projectId} userId={userId} />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}