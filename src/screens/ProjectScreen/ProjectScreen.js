import React from 'react';
import Styles from './Styles';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Tile from '../../components/Tile';

export default function ProjectScreen() {
    
    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            {/* <TouchableOpacity onPress={() => navigation.navigate("../LoginScreen/LoginScreen")}>
                <View style={Styles.Tile}>
                    <MaterialCommunityIcons name="book" size={55} color="#009BAA" style={Styles.Icon}/>
                    <Text style={Styles.Text}>Teamcode</Text>
                </View>
            </TouchableOpacity> */}
            <Tile text="Teamcode" image="book" path="../LoginScreen/LoginScreen" />
            <Tile text="Planning" image="calendar" path="../LoginScreen/LoginScreen" />
            <Tile text="Urenverwantwoording" image="clipboard" path="../LoginScreen/LoginScreen" />
            <Tile text="Waarschuwingen" image="exclamation-thick" path="../LoginScreen/LoginScreen" />
            <Tile text="Uitnodigingen" image="account-plus" path="../LoginScreen/LoginScreen" />
            <Tile text="Leden" image="account-group" path="../LoginScreen/LoginScreen" />
            <Tile text="Scorebord" image="star" path="../LoginScreen/LoginScreen" />
            {/* <View style={Styles.Tile}>
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
            </View> */}
        </SafeAreaView>
    );
}