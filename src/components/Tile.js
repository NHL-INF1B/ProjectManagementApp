import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Tile({ text, image, path }){

    const navigation = useNavigation();
    
    return (
        <Pressable 
            onPress={() =>
            navigation.navigate({path})}>

            <View style={Styles.Tile}>
                <MaterialCommunityIcons name={image} size={55} color="#009BAA" style={Styles.Icon}/>
                <Text style={Styles.Text}>{text}</Text>
            </View>
            
        </Pressable>
    );
}

const Styles = StyleSheet.create({
    Tile: {
		minWidth: 135,
		maxWidth: 135,
		minHeight: 141,
		maxHeight: 141,
		backgroundColor: "white",
		borderColor: "#707070",
		borderRadius: 10,
		flex: 1,
		alignItems: "center",
		margin: 15,
	},
	Icon: {
		flex: 1,
	},
	Text: {
		flex: 2,
		color: "#009BAA",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 25,
	},
});