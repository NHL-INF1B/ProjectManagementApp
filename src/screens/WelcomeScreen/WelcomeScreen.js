import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, Text, Pressable, View, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tile from './../../components/Tile/Tile';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import Styles from './Styles';
import { useFocusEffect } from '@react-navigation/native';

const WelcomeScreen = ({ navigation }) => {

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                return true;
            };

            BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return () => {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    onBackPress
                );
            };
        }, []),
    );

    const [name, setName] = useState("-");
    const [userId, setUserId] = useState("-");

    // Delete data from async storage
    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('@user_data')
        } catch(e) {
            console.log(e);
        }
    };

    // Get data from async storage
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@user_data");
            if (jsonValue !== null) {
               return JSON.parse(jsonValue);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const data = getData();
        data.then((data) => {
            if (data !== undefined) {
                setName(data["name"]),
                setUserId(data["id"]);
            }
        });
    }, []);

    var projectId = null

    return (
        <SafeAreaView style={Styles.container}>
            <Image 
                style={Styles.img} 
                source={require('./../../assets/images/logo.png')}
            />
            <Text style={Styles.welkom}>Welkom, {name}</Text>
            <SafeAreaView style={Styles.safeAreaView}>
                <View style={Styles.row}>
                    <Tile text="Projecten" image="account-group" screen="ShowProjects" projectId={projectId} userId={userId} />
                    <Tile text="Profiel" image="card-account-details" screen="ProfileScreen" projectId={projectId} userId={userId} />
                </View>

                <View style={Styles.row}>
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
                            <MaterialCommunityIcons name="logout" screen="LoginScreen" size={55} color="white" style={Styles.icon} />
                            <Text style={Styles.text}>Uitloggen</Text>
                        </View>
                    </Pressable>
                </View>
                <StatusBar style="auto" />
            </SafeAreaView>
        </SafeAreaView>
  );
}

export default WelcomeScreen;