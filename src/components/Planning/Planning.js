import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

export default function Planning({projectId, userId, planningId, week, activiteit}){

    const navigation = useNavigation();

    return(

        <View>
            <Text style={Styles.sectionHeader}>Week {week}</Text>
                <View style={Styles.row}>

                <Text>{activiteit}</Text>

                <Pressable
                    onPress={() => navigation.navigate("ScheduleEditScreen", {
                        projectId,
                        userId,
                        planningId,
                    })}
                >
                    <FontAwesome style={Styles.icon} name="pencil-square-o" size={24} color="black" />
                </Pressable>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    row: {
		flexDirection: 'row', 
        paddingVertical: 5,
		backgroundColor: "white",
		borderWidth: 2,
        borderRadius: 9,
        justifyContent: 'center',
		textAlign: 'left',
		fontWeight: 'bold',
		justifyContent: 'space-between',
		marginBottom: 10,
		

	},
	sectionHeader: {
		backgroundColor: "#009BAA",
		color: 'white',
		
	},
	icon: {
		textAlign: 'right',
	},
});