import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const CustomTextInput = ({value, setValue, placeholder}) => {
    return (
        <View>
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder} 
                style={styles.input}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    input: {
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#009BAA',
        padding: 1,
        width: '50%',
        backgroundColor: 'white',
        borderRadius: 5,
        alignSelf: 'center',
    },
});
export default CustomTextInput