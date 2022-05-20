import React from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons} from '@expo/vector-icons';

export default function Header(){

    const navigation = useNavigation()

    const GoBack = () => {
        navigation.goBack()
    }

    const GoToHome = () => {
        navigation.navigate("WelcomeScreen")
    }

    return (
        <View style={Styles.HeaderContainer}>
            <MaterialCommunityIcons name="plus" size={40} color="black" />
            <MaterialCommunityIcons name="square-edit-outline" size={40} color="black" />

            <MaterialCommunityIcons name="account-supervisor" size={40} color="black" />

            <Pressable
                onPress={GoBack}>
                <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
            </Pressable>

            <Pressable
                onPress={GoToHome}>
                <MaterialCommunityIcons name="home" size={40} color="black" />
            </Pressable>
        </View>
    )
}

const Styles = StyleSheet.create({
    HeaderContainer: {
        backgroundColor: "#009BAA",
        height: 65,
        borderWidth: 1,
        borderColor: "red",
    }
})