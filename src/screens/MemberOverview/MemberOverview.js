import { React, useEffect, useMemo, useState } from "react";
import Styles from "./Styles";
import { ScrollView, View, Text, FlatList, SafeAreaView, Button, Image, TouchableOpacity, Pressable, Platform, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import Circle from "../../components/Circle/Circle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import ChangePassword from "../ChangePassword/ChangePassword";
import { useNavigation, useRoute } from '@react-navigation/native';
import MemberTile from "../../components/MemberTile/MemberTile";

import membertjes from "./membertjes.json";

const MemberOverview = ({ navigation }) => {
    const [member, setMembers] = useState([]);
    const [roleName, setRoleName] = useState('');

    const route = useRoute();
    const projectId = route.params.projectId;
    const userId = route.params.userId;

    useEffect(() => {
        getRole(userId, projectId);
    }, []);

    const getMembers = (userId, projectId) => {
        try {
            fetch("http://localhost/pma/PmaAPI/handlers/projectMembers/fetchProjectMembers.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    projectId: projectId
                }),
            })
                // .then((response) => response.text())
                .then((response) => response.json())
                .then((response) => {
                    // console.log(response);
                    setMembers(response);
                });
        } catch (error) {
            alert(error);
        }
    }

    const getRole =  (userId, projectId) => {
        try {
            fetch("http://localhost/pma/PmaAPI/handlers/projectMembers/fetchRole.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId
                }),
            })
                // .then((response) => response.text())
                .then((response) => response.json())
                .then((response) => {
                    setRoleName(response);
                    getMembers(userId, projectId);
                });
        } catch (error) {
            alert(error);
        }
    }

    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <FlatList
                data={member}
                keyExtractor={(member) => member.id.toString()}
                renderItem={({ item }) =>
                    <MemberTile
                        id={item.id}
                        name={item.name}
                        role={item.role}
                        userRole={roleName}
                    />
                }
            />
        </SafeAreaView>
    );
}

export default MemberOverview;
