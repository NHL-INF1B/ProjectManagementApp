import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ShowProfileInfo = ({ name, iconName, iconSize, iconColor }) => {
  return (
    <View style={styles.inputFields}>
      <MaterialCommunityIcons
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={styles.icon}
      />
      <Text style={styles.input}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputFields: {
    flexDirection: "row",
    alignSelf: "center",
    width: "70%",
    marginBottom: 15,
    borderColor: "#00AABB",
    borderWidth: 3,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 15,
    textAlign: "left",
  },
  icon: {
    width: "10%",
    alignSelf: "center",
  },
  input: {
    width: "90%",
    padding: 13,
  },
});

export default ShowProfileInfo;
