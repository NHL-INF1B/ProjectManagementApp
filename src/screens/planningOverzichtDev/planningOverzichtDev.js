import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { ScrollView, View, Text, SafeAreaView, Button, Image, TouchableOpacity, Pressable, Platform, Alert, SectionList } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import Circle from "../../components/Circle/Circle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import ChangePassword from "../ChangePassword/ChangePassword";
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useRoute } from "@react-navigation/native";
import PlanningButton from '../../components/PlanningButton/PlanningButton';

const PlanningOverzichtDev = ({ navigation }) => {
    const [data, setData] = useState([]);
    const route = useRoute();
    const projectId = 1;
    const id = 3;
    // const projectId = route.params.projectId;
    // const id = route.params.id;

    useEffect(() => {
        getUserData(1);
        // getPlanningId(planningId, 1);
        // getProjectData(projectId);
	}, []);

    const getUserData = (projectid, id) => {
        // console.log(projectid);
		try {
			fetch("http://localhost:8080/PmaAPI/handlers/PlanningOverzicht/planningOverzicht.php", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					projectid: projectid,
                    id: id,
				}),
			})
            .then((response) => response.json())
            .then((response) => {
                setData(response);
                
            });
		} catch (error) {
			alert(error);
		}
	};

    // const getPlanningId = (planningId) =>   {
    //     try {
	// 		fetch(handlerPath + "projectScreen/getRole.php", {
	// 			method: "POST",
	// 			headers: {
	// 				Accept: "application/json",
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({
    //                 planningId: planningId,
	// 			}),
	// 		})
    //         // .then((response) => response.text())
    //         .then((response) => response.json())
    //         .then((response) => {
    //             console.log(response);
    //             setRoleId(response[0].planningId);
    //             console.log(response[0].planningId);
    //         });
	// 	} catch (error) {
	// 		alert(error);
	// 	}
    // }

    const filterData = (data) => {
        var filter_data = {};
        data.forEach(e => {

            if (filter_data[e.title] != undefined) {
                filter_data[e.title].data = [...filter_data[e.title].data, ...e.data]
            } else {
                filter_data[e.title] = e;
            }
        });

        var _data = Object.values(filter_data);
        console.log(_data);

        return _data;
    }
    
    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <SectionList style={Styles.sectionList} 
                sections={filterData(data)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <View style={Styles.row}>
                        <Text>{item}</Text>
                        <PlanningButton style={Styles.icon} name="pencil-square-o" screen="ScheduleEditScreen" size={24} projectId={1} id={3}/>
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

export default PlanningOverzichtDev;
