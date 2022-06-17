import React, { useEffect, useState }from 'react';
import Styles from './Styles';
import { Text, SafeAreaView, ScrollView, Image, View, Pressable } from 'react-native';
import Tile from '../../components/Tile/Tile';
import Header from '../../components/Header/Header';
import { useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import handlerPath from '../../../env';

export default function ProjectScreen() {

    const route = useRoute();
    const projectId = route.params.projectId;
    const userId = route.params.userId;
    const [projectName, setProjectName] = useState("-");
    const [roleId, setRoleId] = useState("6")
    const [isVoorzitter, setVoorzitter] = useState(false);

    const getProjectData = (projectId) => {
        // console.log(projectId);
		try {
			fetch(handlerPath + "projectScreen/projectScreen.php", {
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

    const getRoleId = (userId, projectId) =>   {
        try {
			fetch(handlerPath + "projectScreen/getRole.php", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
                    userId: userId,
                    projectId: projectId,
				}),
			})
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setRoleId(response[0].roleId);
                console.log(response[0].roleId);
                if(response[0].roleId == 1 || response[0].roleId == 2){
                    setVoorzitter(true);
                };
            });
		} catch (error) {
			alert(error);
		}
    }

    useEffect(() => {
        getProjectData(projectId, userId);
        getRoleId(userId, projectId);
      }, []);
    
    return (
        <SafeAreaView style={Styles.Container}>
            {isVoorzitter ? (
                <Header GoToType="Edit" GoTo="EditProject" CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
            ) : (
                <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
            )}
            <Pressable onPress={() => navigation.navigate("WelcomeScreen")}>
                <Image style={Styles.Img} source={require("../../assets/images/logo.png")} />
            </Pressable>
            <Text style={Styles.ProjectName}>{projectName}</Text>
            <ScrollView>
                <View style={Styles.row}>
                    <View style={Styles.column}>
                        <Tile text="Teamcode" image="book" screen="TeamcodeInzien" projectId={projectId} userId={userId} />
                    </View>
                    <View style={Styles.column}>
                        <Tile text="Planning" image="calendar" screen="PlanningOverview" projectId={projectId} userId={userId} />
                    </View>
                </View>
                <View style={Styles.row}>
                    <View style={Styles.column}>
                        <Tile text="Urenverwantwoording" image="clipboard-text" screen="LogbookScreen" projectId={projectId} userId={userId} />
                    </View>
                    <View style={Styles.column}>
                        <Tile text="Waarschuwingen" image="exclamation-thick" screen="WarningScreen" projectId={projectId} userId={userId} />
                    </View>
                </View>
                <View style={Styles.row}>
                    <View style={Styles.column}>
                        <Tile text="Leden" image="account-group" screen="MemberOverview" projectId={projectId} userId={userId} />
                    </View>
                    <View style={Styles.column}>
                        <Tile text="Scorebord" image="star" screen="Scorebord" projectId={projectId} userId={userId} />
                    </View>
                </View>
                {isVoorzitter ? (
                    <View style={Styles.row}>
                        <View style={Styles.column}>
                            <Tile text="Uitnodigingen" image="account-plus" screen="InviteMembers" projectId={projectId} userId={userId} />
                        </View>
                    </View>
                ) : (
                    <View style={Styles.row}></View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}