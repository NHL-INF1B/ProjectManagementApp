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
import members from './members.json';
import { useNavigation } from '@react-navigation/native';
import MemberTile from "../../components/MemberTile/MemberTile";

const MemberOverview = ({ navigation }) => {
    const [member, setMembers] = useState([]);
    

    useEffect(() => {
        setMembers(members);
    }, []);

    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <FlatList
                data={member}
                keyExtractor={(member) => member.id.toString()}
                renderItem={({ item }) => 
                    <MemberTile 
                        item={item}
                        id={item.id} 
                    />
                }
            />
        </SafeAreaView>
    );
}

export default MemberOverview;
