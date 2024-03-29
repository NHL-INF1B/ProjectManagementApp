import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
    SafeAreaView: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "#009BAA",
      flex: 1,
    },
    marginBottom1: {
      marginBottom: '1%',
    },
    marginBottom5: {
      marginBottom: '5%',
    },
    errorText: {
      textAlign: "center",
      color: "red",
      fontWeight: "bold",
    },
  });