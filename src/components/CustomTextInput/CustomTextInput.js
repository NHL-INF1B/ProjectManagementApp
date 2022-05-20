import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomTextInput = (props) => {
	return (
        <View>
            {props.titleText && (
                <Text style={styles.titleText}>{props.titleText}</Text>
            )}
            <TextInput
                {...props}
                style={[styles.input]}
            />
            {props.errorText && (
                <Text style={styles.errorText}>{props.errorText}</Text>
            )}
      </View>
	);
};

const styles = StyleSheet.create({
    titleText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        textTransform: 'uppercase',
    },
    input: {
        padding: 13,
        alignSelf: "center",
        textAlign: 'center',
        backgroundColor: 'white',
        width: '70%',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#00AABB',
    },
    errorText: {
        textAlign: "center",
        color: "red",
        fontWeight: "bold",
    },
});

export default CustomTextInput;
