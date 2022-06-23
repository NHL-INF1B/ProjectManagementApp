import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { View, Text, SafeAreaView, SectionList, Pressable } from "react-native";
import handlerPath from "../../../env";
import Header from '../../components/Header/Header';
import { useRoute, useIsFocused } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { createWatchCompilerHost } from "typescript";

const PlanningOverview = ({ navigation }) => {
    const [userData, setUserData] = useState([]);
    const [planningId, setPlanningId] = useState('');
    
    const [role, setRole] = useState([]);
    const roleId = role.role_id;

    const route = useRoute();
    const userId = route.params.userId;
    const projectId = route.params.projectId;
    const isFocused = useIsFocused();

    useEffect(() => {
        getUserData(projectId);
        getRole(userId, projectId);
    }, [isFocused]);

    const getRole = (userId, projectId) => {
        fetch(handlerPath + "permissions/getRoleIdHandler.php", {
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
            setRole(response);
        })
    }

    const getUserData = (projectid) => {
        try {
            fetch(handlerPath + "planning/planningOverzicht.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectid: projectid,
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    setUserData(response);
                });
        } catch (error) {
            alert(error);
        }
    };

    const filterData = (data) => {
        var filter_data = {};

        data.forEach(e => {

            if (filter_data[e.title] != undefined) {
                filter_data[e.title].data.push([e.data[0], e.id]);

            } else {
                filter_data[e.title] = []; //Make array
                filter_data[e.title]["title"] = e.title; //Set title
                filter_data[e.title]["id"] = e.id; //Set id

                //make 'data' object
                var dataObj = [];
                dataObj.push([e.data[0], e.id]);

                filter_data[e.title]["data"] = dataObj;//Set data
            }
        });

        var _data = Object.values(filter_data);

        return _data;
    }

    if(roleId == 1 || roleId == 2 || roleId == 3){
        var GoTo = "PlanningAdd";
        var GoToType = "Add";
    } else{
        var GoTo = "None";
        var GoToType = "None";
    }

    function checkData(userData){
        if(userData == "NO_DATA"){
            return(<Text style={Styles.nothingFound}>Er is nog geen planning</Text>)
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

                        <View style={Styles.change}>
                            <Pressable
                                onPress={() => navigation.navigate("ScheduleEditScreen", {
                                    projectId,
                                    userId,
                                    planningId: item[1],
                                })}
                            >
                                <FontAwesome style={Styles.icon} name="pencil-square-o" size={24} color="black" />
                            </Pressable>
                        </View>

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
            <Text style={Styles.title}>Planning</Text>

            {checkData(userData)}
        </SafeAreaView>
    );
}

export default PlanningOverview;
