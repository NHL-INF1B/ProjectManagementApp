import React, {useEffect, useState} from 'react';
import { SafeAreaView, Text, View, Pressable, Platform, FlatList } from 'react-native';
import Styles from './Styles';
import Header from './../../components/Header/Header'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DropDown from '../../components/RolesPicker/RolesPicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DropDownPicker from 'react-native-dropdown-picker';

// const DATA = [
//     {
//         id: {userId},
//         title: {name},
//     },
// ];
//  const Item = ({ title }) => (

//  )

const MemberScreen = () => {
    // var name = "Temp";
    const navigation = useNavigation();
    const [name, setName] = useState("-");
    const [roleId, setRoleId] = useState("-");
    const [userId, setUserId] = useState("-");
    const [projectId, setProjectId] = useState("-");
    const [items, setItems] = useState([
        {label: 'Voorzitter', value: 1},
        {label: 'Vicevoorzitter', value: 2},
        {label: 'Planner', value: 3},
        {label: 'Kwaliteitscontroleur', value: 4},
        {label: 'Notulist', value: 5},
        {label: 'Projectlid', value: 6}
    ]);
    // const showValue = (items) => {
    //     this.setItems
    // }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@member_data');
            const jsonValues = await AsyncStorage.getItem('@user_data');
            if (jsonValue !== null) {
                return JSON.parse(jsonValue);
            }
            if (jsonValues !== null) {
                return JSON.parse(jsonValues);
            }
        } catch (e) {
            alert(e);
        }
    };

    const storeData = async (value) => {
        try {
            const jsonValues = JSON.stringify(value);
            await AsyncStorage.setItem('@member_data', jsonValues);
        } catch (e) {
            alert(e);
        }
    };

    useEffect(() => {
        const data = getData();
        data.then((data) => {
            if (data !== undefined) {
                setName(data["name"]),
                setRoleId(data["roleId"]),
                setUserId(data["userId"]),
                setProjectId(data["projectId"]);
                console.log('name:', name, 'roleId:', roleId, 'projectId:', projectId);
            }
        });
    }, []);

    //temp hardcode
    // var projectId = 18;
    // var userId = 3;
    // var roleId = 6;
    // console.log(userId);

    const sendDataToAPI = (value) => {
        try {
            fetch("http://localhost/pma/PmaAPI/handlers/members/getRolesHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    value: value,
                }),
            })
            .then((response) => response.json())
            .then((response) => {
                catchFeedback(response);
            });
        } catch (error) {
            alert(error);
        }
    };

    const catchFeedback = (response) => {
        console.log(response);
        
    }

    return (
        <SafeAreaView style={Styles.container}>
            <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" />
                <View style={Styles.profile}>
                    <MaterialCommunityIcons name="account" size={86} color="black" />
                    <View style={Styles.user}>
                        <Text style={Styles.textName}>{name}</Text>
                        <DropDown items={items} setItems={setItems} projectId={projectId} userId={userId} roleId={roleId} />
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
                {/* <View style={Styles.profile}>
                    <MaterialCommunityIcons name="account" size={86} color="black" />
                    <View style={Styles.user}>
                        <Text style={Styles.textName}>{name}</Text>
                        <DropDown items={items} setItems={setItems} projectId={projectId} userId={userId} roleId={roleId} />
                    </View>
                    <Pressable
                        onPress={() =>
                        navigation.navigate("ProfileScreen", {
                            projectId,
                            userId,
                        })}>
                        <MaterialCommunityIcons name={'chevron-right'} size={40} />
                    </Pressable>
                </View> */}
        </SafeAreaView>
    )
}

export default MemberScreen;