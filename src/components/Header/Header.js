import React from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons} from '@expo/vector-icons';

export default function Header({ GoToType, GoTo, ReturnType }){

    const navigation = useNavigation()

    const GoBack = () => {
        navigation.goBack()
    }

    const NavigateTo = () => {
        navigation.navigate(GoTo)
    }

    if(GoToType == "Add"){
        var GoToIcon = "plus";
    } else if(GoToType == "Edit"){
        var GoToIcon = "square-edit-outline";
    }

    if(ReturnType == "Back"){
        var ReturnIcon = "arrow-left";
    } else if(ReturnType == "Home"){
        var ReturnIcon = "home";
    }

    return (
        <View style={Styles.HeaderContainer}>
            
            <Pressable
                onPress={NavigateTo}>
                <MaterialCommunityIcons name={GoToIcon} size={40} color="black" />
            </Pressable>

            <View style={Styles.Center}>
                <MaterialCommunityIcons name="account-supervisor" size={40} color="black" />
            </View>

            <Pressable
                onPress={GoBack}>
                <MaterialCommunityIcons name={ReturnIcon} size={40} color="black" />
            </Pressable>
        </View>
    )
}

const Styles = StyleSheet.create({
    HeaderContainer: {
        backgroundColor: "#009BAA",
        minHeight: 65,
        maxHeight: 65,
        flex: 1,
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
    },
    Center: {
        height: 40,
        width: 40,
        marginLeft: 70,
        marginRight: 70,
    }
})