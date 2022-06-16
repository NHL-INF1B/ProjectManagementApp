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
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import handlerPath from "../../../env";
import Header from '../../components/Header/Header';

const PlanningOverzichtDev = ({ navigation }) => {
    const [data, setData] = useState([]);

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
                setData(response);
                
            });
		} catch (error) {
			alert(error);
		}
	};

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

    var GoToType = "None";
    var GoTo = "None";
    
    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Header GoToType={GoToType} GoTo={GoTo} CenterGoTo="None" ReturnType="Back" />
            <SectionList style={Styles.sectionList} 
                sections={filterData(data)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <View style={Styles.row}>
                        <Text>{item}</Text>
                        <FontAwesome style={Styles.icon} name="pencil-square-o" size={24} color="black" />
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
