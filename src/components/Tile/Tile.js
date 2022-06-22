import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Tile({ text, image, screen, projectId, userId }){

    const navigation = useNavigation();
    
    var styling = Styles.Tile;
    
    if (screen == "LoginScreen") {
        styling = Styles.Uitloggen;
    };

    var screen = screen;

    return (
        <Pressable 
            onPress={() =>
            navigation.navigate(screen, {
                projectId: projectId,
                userId: userId,
            })}>

            <View style={styling}>
                <MaterialCommunityIcons name={image} size={55} color="#000000" style={Styles.Icon}/>
                <Text style={Styles.Text}>{text}</Text>
            </View>
            
        </Pressable>
    );
}

const Styles = StyleSheet.create({
    Tile: {
        minWidth: 135,
        minHeight: 145,
        maxWidth: 135,
        maxHeight: 141,
        backgroundColor: "white",
        borderColor: "#707070",
        borderRadius: 10,
        flex: 1,
        alignItems: "center",
        margin: 15,
    },
    Icon: {
        flex: 2,
        paddingTop: 15,
    },
    Text: {
        flex: 2,
        color: "#009BAA",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 25,
    },
});