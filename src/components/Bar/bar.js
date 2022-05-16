import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Bar = ({ name, color, style, value, value2 }) => {
    return (
        <View style={[styles.bar, styles.marginBottom5, styles.flex]}>
            <MaterialCommunityIcons 
                name={name} 
                size={60} 
                color={color} 
                style={[style]} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    bar: {
        width: '95%',
        marginLeft: '2.5%',
        height: 100,
        borderRadius: 20,
        backgroundColor: 'red',
    },
    marginBottom5: {
        marginBottom: '5%',
    },
    flex: {
        flexDirection: 'row',
    },
});
export default Bar