import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Activity({ Name, Description, Date, Start, End, userId, projectId }){

    const navigation = useNavigation();

    return(
        <View style={Styles.ActivityContainer}>
            <Text style={Styles.ActivityText}>{Name}</Text>
            <Text style={Styles.ActivityDescription}>{Description}</Text>
            <Text style={Styles.ActivityDate}>{Date}</Text>
            <Text style={Styles.ActivityTimes}>{Start}</Text>
            <Text style={Styles.ActivityTimes}>{End}</Text>
            <Pressable
                onPress={navigation.navigate("HourEditScreen",
                {
                    projectId,
                    userId,
                })}>
                <MaterialCommunityIcons name="square-edit-outline" size={40} color="black" />
            </Pressable>
        </View>
    )
}

const Styles = StyleSheet.create({
    ActivityContainer: {
        minWidth: 343,
        minHeight: 97,
        backgroundColor: "white",
        borderRadius: 30,
        borderColor: "#707070",
        borderWidth: 1,
    },
    ActivityText: {
        color: "#009BAA",
        fontWeight: "bold",
        fontSize: 15,
    },
    ActivityDescription: {
        fontWeight: "bold",
        fontSize: 13,
    },
    ActivityDate: {
        color: "#009BAA",
        fontWeight: "bold",
        fontSize: 15,
    },
    ActivityTimes: {
        color: "#009BAA",
        fontWeight: "bold",
        fontSize: 13,
    }
})