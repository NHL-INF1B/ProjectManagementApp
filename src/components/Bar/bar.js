import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Bar = ({ name, color, value }) => {
    return (
        <View style={[styles.bar, styles.marginBottom5, styles.flex]}>
            <MaterialCommunityIcons 
                name={name} 
                size={100} 
                color={color} 
                style={[styles.flex, styles.icon]} 
            />
            <View style={styles.text}>
                <Text style={styles.name}>Naam</Text>
                <Text style={styles.text}>Te laat zonder geldige reden testtesttesttesttesttesttesttesttesttesttesttesttesttesttestaggadgdfasa</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        width: '95%',
        height: '10%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 20,
        backgroundColor: 'red',
    },
    icon: {
        marginBottom: 'auto',
        marginTop: 'auto',
    },
    marginBottom5: {
        marginBottom: 10,
    },
    flex: {
        flexDirection: 'row',
    },
    text: {
        alignSelf: 'center',
        fontSize: 15,
        flex: 1,
        flexWrap: 'wrap',
        marginTop: 5,
    },
    name: {
        color: 'white',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 20,
    }
});
export default Bar