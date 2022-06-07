import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Activity({ id, Name, Description, Date, Start, End, userId, projectId }){

    const navigation = useNavigation();

    Start = Start.substring(10, 16);
    End = End.substring(10, 16);

    return(
        <View style={Styles.ActivityContainer}>
            <View style={Styles.Left}>
                <Text style={Styles.ActivityText}>{Name}</Text>
                <Text style={Styles.ActivityDescription}>{Description}</Text>
            </View>
            <View style={Styles.Right}>
                <Text style={Styles.ActivityDate}>{Date}</Text>
                <Text style={Styles.ActivityTimes}>{Start}</Text>
                <Text style={Styles.ActivityTimes}>{End}</Text>
                <Pressable
                onPress={() => navigation.navigate("HourEditScreen",
                {
                    projectId,
                    userId,
                    id,
                })}>
                <MaterialCommunityIcons name="square-edit-outline" size={35} color="black" />
            </Pressable>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    ActivityContainer: {
        minWidth: "95%",
        maxWidth: "95%",
        minHeight: 97,
        maxHeight: 97,
        margin: 10,
        padding: 6,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "white",
        borderRadius: 30,
        borderColor: "#707070",
        borderWidth: 1,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    Left: {
        maxWidth: "75%",
    },
    Right: {
        alignItems: "flex-end",
    },
    ActivityText: {
        color: "#009BAA",
        fontWeight: "bold",
        fontSize: 15,
        flexWrap: "wrap",
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