import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';

export default function Activity({ Name, Description, Date, Start, End }){

    return(
        <View style={Styles.ActivityContainer}>
            <Text style={Styles.ActivityText}>{Name}</Text>
            <Text style={Styles.ActivityDescription}>{Description}</Text>
            <Text style={Styles.ActivityDate}>{Date}</Text>
            <Text style={Styles.ActivityTimes}>{Start}</Text>
            <Text style={Styles.ActivityTimes}>{End}</Text>
            <MaterialCommunityIcons name="square-edit-outline" size={40} color="black" />
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

    },
    ActivityDescription: {

    },
    ActivityDate: {

    },
    ActivityTimes: {

    }
})