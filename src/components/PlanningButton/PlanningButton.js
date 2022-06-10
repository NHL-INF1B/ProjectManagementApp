import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 

export default function PlanningButton({ projectId, id }){

    const navigation = useNavigation();

    var screen = screen;

    return (
        <Pressable 
            onPress={() =>
            navigation.navigate(screen, {
                projectId: projectId,
                id: id,
            })}>

            <View>
                <FontAwesome name="pencil-square-o" size={24} color="black"/>
            </View>
            
        </Pressable>
    );
}

