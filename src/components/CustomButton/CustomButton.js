import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomButton = (props) => {
	return (
        <View>
            <TouchableOpacity
                {...props}
                style={styles[props.buttonType]}
              >
                <Text style={styles[props.buttonText]}>{props.text}</Text>
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
      lightBlueButton: {
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "white",
        color: "black",
        fontWeight: "bold",
        padding: 4,
        width: '70%',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#009BAA',
      },
      buttonText: {
        color:"white", 
        textTransform:"uppercase", 
        fontWeight: "bold",
      },
      buttonTextBlack: {
        color:"#707070",
      },
});

export default CustomButton;
