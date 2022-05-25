import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomButton = (props) => {
	return (
        <View>
            <TouchableOpacity
                {...props}
                style={styles[props.buttonType]}
              >
                <Text style={styles.buttonText}>{props.text}</Text>
            </TouchableOpacity>
        </View>
	);
};

const styles = StyleSheet.create({
      blueButton: {
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "#005AAA",
        color: "white",
        fontWeight: "bold",
        padding: 13,
        width: '70%',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#006BC9',
      },
      redButton: {
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "#E62328",
        color: "white",
        fontWeight: "bold",
        padding: 13,
        width: '70%',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#CB0005',
      },
      greenButton: {
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "#00AA33",
        color: "white",
        fontWeight: "bold",
        padding: 13,
        width: '70%',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#008528',
      },
      buttonText: {
        color:"white", 
        textTransform:"uppercase", 
        fontWeight: "bold",
      }
});

export default CustomButton;
