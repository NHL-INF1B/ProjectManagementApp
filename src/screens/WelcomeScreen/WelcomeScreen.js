import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, Text, Pressable, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tile from './../../components/Tile/Tile';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import Styles from './Styles';


const WelcomeScreen = ({ navigation }) => {

    useEffect(() => {
        const data = getData();
        data.then((data) => {
                console.log((data) => 
                console.log(data['name']));
        });
    }, 
    []);

    // useEffect(() => {
    //     const uitlog = removeValue();
    //     uitlog.then((uitlog) => {
    //         navigation.navigate("LoginScreen");
    //     });
    // }, 
    // []);

    // Data verwijderen
    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('@MyApp_key')
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

    return (
        <SafeAreaView style={Styles.container}>
            <Image 
                style={Styles.img}
                source={require('./../../assets/images/logo.png')}
            />
            <Text style={Styles.welkom}>Welkom, </Text>
            <SafeAreaView style={Styles.safeAreaView}>
                <Tile text="Projecten" image="account-group" screen="LoginScreen" projectId={18} userId={11} />
                <Tile text="Profiel" image="card-account-details" screen="LoginScreen" projectId={18} userId={11} />
                <Pressable
                    onPress={() => {
                        const uitlog = removeValue();
                        uitlog.then((uitlog) => 
                        navigation.navigate("LoginScreen", {
                            projectId: projectId, 
                            userId: userId,
                        }))
                    }}>
                    <View style={Styles.uitloggen}>
                        <MaterialCommunityIcons name="logout" screen="LoginScreen" size={55} color="#009BAA" style={Styles.icon} />
                        <Text style={Styles.text}>Uitloggen</Text>
                    </View>
                </Pressable>

                <Tile text="Uitloggen" image="logout" screen="LoginScreen" projectId={18} userId={11} />
            <StatusBar style="auto" />
            </SafeAreaView>
        </SafeAreaView>
  );
}

export default WelcomeScreen;