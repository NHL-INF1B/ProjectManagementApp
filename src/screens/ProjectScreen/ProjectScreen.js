import React, { useEffect, useState }from 'react';
import Styles from './Styles';
import { Text, SafeAreaView, ScrollView, Image, View } from 'react-native';
import Tile from '../../components/Tile/Tile';
import Header from '../../components/Header/Header';
import { useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";

export default function ProjectScreen() {

    const route = useRoute();
    const projectId = route.params.projectId;
    const userId = route.params.userId;
    const [projectName, setProjectName] = useState("-");


    const getProjectData = (projectId) => {
        // console.log(projectId);
		try {
			fetch("https://inf1b.serverict.nl/handlers/projectScreen/projectScreen.php", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					projectId: projectId,
				}),
			})
            // .then((response) => response.text())
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setProjectName(response[0].projectName);
            });
		} catch (error) {
			alert(error);
		}
	};

    useEffect(() => {
        getProjectData(projectId);
      }, []);
    
    return (
            <SafeAreaView style={Styles.Container}>
                <Header GoToType="Edit" GoTo="EditProject" CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
                <Image style={Styles.Img} source={require("../../assets/images/logo.png")} />
                <Text style={Styles.ProjectName}>{projectName}</Text>
                <ScrollView>
                    <View style={Styles.row}>
                        <View style={Styles.column}>
                            <Tile text="Teamcode" image="book" screen="TeamcodeScreen" projectId={projectId} userId={userId} />
                        </View>
                        <View style={Styles.column}>
                            <Tile text="Planning" image="calendar" screen="PlanningScreen" projectId={projectId} userId={userId} />
                        </View>
                    </View>
                    <View style={Styles.row}>
                        <View style={Styles.column}>
                            <Tile text="Urenverwantwoording" image="clipboard" screen="LogbookScreen" projectId={projectId} userId={userId} />
                        </View>
                        <View style={Styles.column}>
                            <Tile text="Waarschuwingen" image="exclamation-thick" screen="WarningScreen" projectId={projectId} userId={userId} />
                        </View>
                    </View>
                    <View style={Styles.row}>
                        <View style={Styles.column}>
                            <Tile text="Uitnodigingen" image="account-plus" screen="InviteMembers" projectId={projectId} userId={userId} />
                        </View>
                        <View style={Styles.column}>
                            <Tile text="Leden" image="account-group" screen="MemberScreen" projectId={projectId} userId={userId} />
                        </View>
                    </View>
                    <View style={Styles.row}>
                        <View style={Styles.column}>
                            <Tile text="Scorebord" image="star" screen="ScoreScreen" projectId={projectId} userId={userId} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
    );
}