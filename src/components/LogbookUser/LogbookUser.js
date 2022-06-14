import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function LogbookUser({ projectId, userId, userName }){

    const navigation = useNavigation();

    return(
        <Pressable
            onPress={() =>
            navigation.navigate("LogbookScreen", {
                projectId: projectId,
                selectedUserId: userId,
                viewing: "viewing",
            })}>
            <View style={Styles.Container}>
                <MaterialCommunityIcons name="account" size={90} color="black" />
                <Text style={Styles.Name}>{userName}</Text>
            </View>
        </Pressable>
    )
}

const Styles = StyleSheet.create({
    Container: {
        minWidth: 343,
        minHeight: 97,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 30,
        borderColor: "#707070",
        borderWidth: 1,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    Name: {
        fontSize: 20,
        color: "#009BAA",
        fontWeight: "bold",
    }
})