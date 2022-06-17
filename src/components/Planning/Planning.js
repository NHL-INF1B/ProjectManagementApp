import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

export default function Planning({projectId, userId, planningId, week, activiteit}){

    const navigation = useNavigation();

    return(

        <View style={Styles.body}>
            <View style={Styles.header}>
                <Text style={Styles.text}>Week {week}</Text>
            </View>
                <View style={Styles.row}>
                    <View style={Styles.activity}>
                        <Text>{activiteit}</Text>
                    </View>
                    <View style={Styles.change}>
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
        </View>
    )
}

const Styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    row:{
        flex: 1,
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        minHeight: 50,
        padding: 10,
        margin: 8,
        borderWidth: 3,
        borderRadius: 20,
        borderColor: 'white',
        backgroundColor:'white',
    },
    text: {
        width: "90%",
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
	icon: {
		textAlign: 'right',
	},
    activity: {
        minWidth: "80%",
        flexShrink: 1,
    },
    change: {
        minWidth: "5%", 
        alignItems: "center",
        justifyContent: "center",
    },
});