import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Circle = ({ name, size, color, style }) => {
    return (
        <View style={styles.circle}>
            <MaterialCommunityIcons 
                name={name}
                size={size}
                color={color}
                style={style}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    circle: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: 'black',
        backgroundColor: 'white',
        marginLeft: '45%',
    },
});
export default Circle