import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { View, Text, SafeAreaView, Pressable, SectionList } from "react-native";
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import handlerPath from "../../../env";
import Header from '../../components/Header/Header';

const PlanningOverzichtDev = ({ navigation }) => {
    const [planning, setPlanning] = useState([]);

    const route = useRoute();
    const userId = route.params.userId;
    const projectId = route.params.projectId;

    useEffect(() => {
        getPlanning(projectId);
	}, []);

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
            {/* <SectionList style={Styles.sectionList} 
                sections={planning}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <View style={Styles.row}>
                        <Text>{item}</Text>
                        <Pressable
                            // onPress={navigation.navigate("ScheduleEditScreen", {
                            //     projectId,
                            //     userId,
                            //     item,
                            // })}
                        >
                            <FontAwesome style={Styles.icon} name="pencil-square-o" size={24} color="black" />
                        </Pressable>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={Styles.sectionHeader}>
                        {title}
                    </Text>
                )}
            /> */}

            <SectionList
                sections={planning}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => (
                    <View style={Styles.row}>
                        <Text>{item}</Text>
                        <Pressable
                            // onPress={navigation.navigate("ScheduleEditScreen", {
                            //     projectId,
                            //     userId,
                            //     item,
                            // })}
                        >
                            <FontAwesome style={Styles.icon} name="pencil-square-o" size={24} color="black" />
                        </Pressable>
                    </View>
                )}
                renderSectionHeader={({ section: {week} }) => (
                    <Text style={Styles.sectionHeader}>
                        {title}
                    </Text>
                )}
            />
        </SafeAreaView>
    );
}

export default PlanningOverzichtDev;
