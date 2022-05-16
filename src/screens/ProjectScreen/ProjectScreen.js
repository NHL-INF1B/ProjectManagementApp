import React from 'react';
import Styles from './Styles';
import { View, Text, SafeAreaView } from 'react-native';

function ProjectScreen() {
    
    const onPress = () => {
        console.log('gedrukt');
    }
    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            
        </SafeAreaView>
    );
}

export default ProjectScreen;