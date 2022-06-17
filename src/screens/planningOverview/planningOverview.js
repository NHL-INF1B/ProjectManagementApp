import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { View, Text, SafeAreaView, Pressable, SectionList } from "react-native";
import { useRoute, useIsFocused } from '@react-navigation/native';
import handlerPath from "../../../env";
import Header from '../../components/Header/Header';
import { FlatList } from 'react-native-gesture-handler';
import Planning from "../../components/Planning/Planning";

const PlanningOverview = ({ navigation }) => {
    const [planning, setPlanning] = useState([]);

    const route = useRoute();
    const isFocused = useIsFocused();
    const userId = route.params.userId;
    const projectId = route.params.projectId;

    useEffect(() => {
        getPlanning(projectId);
	}, [isFocused]);

    const getPlanning = (projectId) => {
        // console.log(projectId);
		try {
			fetch(handlerPath + "planning/planningOverzicht.php", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					projectid: projectId,
				}),
			})
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setPlanning(response);
                
            });
		} catch (error) {
			alert(error);
		}
	};

    var GoToType = "None";
    var GoTo = "None";
    
    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Header GoToType={GoToType} GoTo={GoTo} CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />

            <FlatList
                data={planning}
                keyExtractor={(planning) => planning.id}
                renderItem={({item}) => <Planning projectId={projectId} userId={userId} planningId={item.id} week={item.week} activiteit={item.activiteit} />}
            />

        </SafeAreaView>
    );
}

export default PlanningOverview;
