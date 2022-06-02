import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';

export default function Activity(){

    return(
        <View style={Styles.ActivityContainer}>
            <Text style={Styles.ActivityText}>Activiteit</Text>
            <Text style={Styles.ActivityDescription}>Taken verdelen voor het plan van aanpak over het groepje, alle koppen er correct ingezet en kop 10 gemaakt.</Text>
            <Text style={Styles.ActivityDate}>10-10-2021</Text>
            <Text style={Styles.ActivityTimes}>10:30</Text>
            <Text style={Styles.ActivityTimes}>12:00</Text>
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