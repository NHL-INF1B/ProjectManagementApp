import React, {useEffect, useState} from 'react';
import { SafeAreaView, Text, View, Pressable, Platform, FlatList } from 'react-native';
import Styles from './Styles';
import Header from './../../components/Header/Header'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DropDown from '../../components/RolesPicker/RolesPicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from "react-hook-form";

// import DropDownPicker from 'react-native-dropdown-picker';

const MemberScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("-");
    const [roleId, setRoleId] = useState(null);
    const [userId, setUserId] = useState();
    const [items, setItems] = useState([
        {label: 'Voorzitter', value: 1},
        {label: 'Vicevoorzitter', value: 2},
        {label: 'Planner', value: 3},
        {label: 'Kwaliteitscontroleur', value: 4},
        {label: 'Notulist', value: 5},
        {label: 'Projectlid', value: 6}
    ]);
    
    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
          name: '',
          roleId: roleId,
          userId: userId,
        }
      });

    const onSubmit = (data) => {
        sendDataToAPI(data.roleId);
    };

    
    const route = useRoute();
    const projectId = route.params.projectId;
    console.log(projectId);  

    // const getData = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('@user_data');
    //         console.log(jsonValue);
    //         if (jsonValue !== null) {
    //             return JSON.parse(jsonValue);
    //         }
    //     } catch (e) {
    //         alert(e);
    //     }
    // };


    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@member_data', jsonValue);
            console.log(jsonValue);
        } catch (e) {
            alert(e);
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@member_data');
            console.log(jsonValue);
            if (jsonValue !== null) {
                return JSON.parse(jsonValue);
            }
        } catch (e) {
            alert(e);
        }
    };
    // console.log(jsonValue);

    useEffect(() => {
        const data = getDataFromAPI(projectId);
            if (data !== undefined) {
                setName(data["name"]),
                setRoleId(data["role_id"]),
                setUserId(data["user_id"]),
                console.log(data);
                console.log('name:', name, 'role_id:', roleId, 'user_id:', userId);
            };
            console.log('projectId:', projectId);
    }, []);


    /*
        Aan die php link in de onderstaande functie kun je 
        
        een GET meegeven
        die kun je dan uitlezen in je getRolesHandler.php




    */

    const getDataFromAPI = (projectId) => {
        try {
            console.log(projectId);
            fetch("https://inf1b.serverict.nl/handlers/roles/getRolesHandler.php?projectId=${encodeURIComponent(route.params.projectId)}", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectId: projectId,
                })
            })
            .then((response) => response.text())
            .then((response) => {
                setValue["userId", response.userId];
                setValue["roleId", response.roleId];
                setValue["name", response.name];
                // catchFeedback(response);
                console.log('userid:', userId, 'roleid:', roleId, 'name:', name);
            });
        } catch(e) {
            alert(e);
        }
    };

    // const catchFeedback = (response) => {
    //     console.log(response);
        
    //     for (let i = 0; i < response.length; i++) {
    //         console.log(response[i].userId);
    //         // console.log(response[index].projectId);
    //         console.log(response[i].roleId);
    //         console.log(response[i].userName);
    //         storeData(response[i]);
    //     }
    // }

    const sendDataToAPI = (roleId) => {
        try {
            fetch("http://localhost/ReactNative/PmaAPI/handlers/roles/updateRolesHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    roleId: roleId,
                }),
            })
            .then((response) => response.json())
            // .then((response) => {
                // catchFeedback(response);
            // });
            console.log(response);
        } catch (error) {
            alert(error);
        }
    };

    // const catchFeedback = (response) => {
    //     console.log(response);
        
    //     for (let index = 0; index < response.length; index++) {
    //         console.log(response[index].userId);
    //         // console.log(response[index].projectId);
    //         console.log(response[index].roleId);
    //         console.log(response[index].userName);
    //         storeData(response[index]);
    //     }
    // }

    return (
        <SafeAreaView style={Styles.container}>
            <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" />
                <View style={Styles.profile}>
                    <MaterialCommunityIcons name="account" size={80} color="black" />
                    <View style={Styles.user}>
                        <Text style={Styles.textName}>{name}</Text>
                        <DropDown items={items} setItems={setItems} userId={userId} roleId={roleId} />
                    </View>
                    <Pressable
                        onPress={() =>
                        navigation.navigate("ProfileScreen", {
                            projectId,
                            userId,
                        })}>
                        <MaterialCommunityIcons name={'chevron-right'} size={40} />
                    </Pressable>
                </View>
                <Pressable
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text>save change</Text>
                </Pressable>
        </SafeAreaView>
    )
}

export default MemberScreen;