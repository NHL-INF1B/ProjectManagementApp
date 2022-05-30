import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, Text, Pressable, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tile from './../../components/Tile/Tile';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import Styles from './Styles';

const WelcomeScreen = ({ navigation }) => {

    const [name, setName] = useState("-");
    const [userId, setUserId] = useState("-");

    // Data verwijderen
    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('@user_data')
        } catch(e) {
            alert(e);
        }
    };

    // Data ophalen
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@user_data");
            if (jsonValue !== null) {
               return JSON.parse(jsonValue);
            }
        } catch (e) {
            alert(e);
        }
    };

    useEffect(() => {
        const data = getData();
        data.then((data) => {
            if (data !== undefined) {
                setName(data["name"]),
                setUserId(data["userId"]);
            }
        });
    }, []);

    // temp hardcode
    var projectId = 18

    return (
        <SafeAreaView style={Styles.container}>
            <Image 
                style={Styles.img}
                source={require('./../../assets/images/logo.png')}
            />
            <Text style={Styles.welkom}>Welkom, {name}</Text>
            <SafeAreaView style={Styles.safeAreaView}>
                <Tile text="Projecten" image="account-group" screen="ProjectScreen" projectId={projectId} userId={userId} />
                <Tile text="Profiel" image="card-account-details" screen="ProfileScreen" projectId={projectId} userId={userId} />
                <Pressable
                    onPress={() => {
                        const uitlog = removeValue();
                        uitlog.then((uitlog) => 
                        navigation.navigate("LoginScreen", 
                        {
                            projectId, 
                            userId,
                        }
                        ))
                    }}>
                    <View style={Styles.uitloggen}>
                        <MaterialCommunityIcons name="logout" screen="LoginScreen" size={55} color="#009BAA" style={Styles.icon} />
                        <Text style={Styles.text}>Uitloggen</Text>
                    </View>
                </Pressable>
            <StatusBar style="auto" />
            </SafeAreaView>
        </SafeAreaView>
  );
}

export default WelcomeScreen;