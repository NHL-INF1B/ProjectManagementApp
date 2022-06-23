import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { View, Text, SafeAreaView, SectionList, Pressable } from "react-native";
import handlerPath from "../../../env";
import Header from '../../components/Header/Header';
import { useRoute, useIsFocused } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const PlanningOverview = ({ navigation }) => {
    const [userData, setUserData] = useState([]);
    const [planningId, setPlanningId] = useState('');

    const route = useRoute();
    const userId = route.params.userId;
    const projectId = route.params.projectId;

    useEffect(() => {
        getUserData(projectId);
    }, []);

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

    var GoToType = "None";
    var GoTo = "None";

    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <SectionList style={Styles.sectionList}
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
            />
        </SafeAreaView>
    );
}

export default PlanningOverview;
