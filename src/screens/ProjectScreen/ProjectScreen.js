import React from 'react';
import Styles from './Styles';
import { View, Text, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';

function ProjectScreen() {
    
    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <View style={Styles.Tile}>
                <MaterialCommunityIcons name="book" size={55} color="#009BAA" style={Styles.Icon}/>
                <Text style={Styles.Text}>Teamcode</Text>
            </View>
            <View style={Styles.Tile}>
                <MaterialCommunityIcons name="calendar" size={55} color="#009BAA" style={Styles.Icon}/>
                <Text style={Styles.Text}>Planning</Text>
            </View>
            <View style={Styles.Tile}>
                <MaterialCommunityIcons name="clipboard" size={55} color="#009BAA" style={Styles.Icon}/>
                <Text style={Styles.Text}>Urenverantwoording</Text>
            </View>
            <View style={Styles.Tile}>
                <MaterialCommunityIcons name="exclamation-thick" size={55} color="#009BAA" style={Styles.Icon}/>
                <Text style={Styles.Text}>Waarschuwingen</Text>
            </View>
        </SafeAreaView>
    );
}

export default ProjectScreen;