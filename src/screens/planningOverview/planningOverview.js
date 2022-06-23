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
    const [isPlanner, setPlanner] = useState(false);

    useEffect(() => {
        getPlanning(projectId);
        getRoleId(userId, projectId);
	}, [isFocused]);

    const getPlanning = (projectId) => {
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
                setPlanning(response);
                
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
                if(response[0].roleId == 1 || response[0].roleId == 2 || response[0].roleId == 3){
                    setPlanner(true);
                };
            });
		} catch (error) {
			alert(error);
		}
    }

    function checkData(planning){
        if(planning == "NO_DATA"){
            return(<Text style={Styles.nothingFound}>Er is nog geen planning</Text>)
        } else{
            return(<FlatList
                data={planning}
                keyExtractor={(planning) => planning.id}
                renderItem={({item}) => <Planning projectId={projectId} userId={userId} planningId={item.id} week={item.week} activiteit={item.activiteit} />}
            /> )
        }
    }

    function checkData(userData){
        if(userData == "NO_DATA"){
            return(<Text style={Styles.nothingFound}>Er is nog geen planning.</Text>)
        } else{
            return(<SectionList style={Styles.sectionList}
                sections={filterData(userData)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <View style={Styles.row}>
                        {/* item[0] = NAME */}
                        {/* item[1] = ID */}

                        <View style={Styles.activity}>
                            <Text style={Styles.activityText}>{item[0]}</Text>
                        </View>

            {checkData(planning)}

                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={Styles.sectionHeader}>
                        {title}
                    </Text>
                )}
            />)
        }
    }


    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Header GoToType={GoToType} GoTo={GoTo} CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
            
            {checkData(userData)}
        </SafeAreaView>
    );
}

export default PlanningOverview;