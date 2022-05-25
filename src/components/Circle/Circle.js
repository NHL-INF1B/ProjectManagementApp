import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Circle = (props) => {
    return (
        <View>
            <View style={styles.circle}>
                <MaterialCommunityIcons 
                    {...props}
                />
            </View>
            {props.text && (
                <View>
                    <Text style={styles.text}>{props.text}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        alignSelf: "center",
        borderRadius: 100,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
    },
    text : {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        textTransform: 'uppercase',
        fontSize: 20,
    },
});
export default Circle