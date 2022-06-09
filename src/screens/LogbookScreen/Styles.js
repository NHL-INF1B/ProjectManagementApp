import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  SafeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#009BAA",
    alignItems: "center",
    flex: 1,
  },
  Title: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 25,
  },
  Name: {
      fontWeight: "bold",
      color: "#FFFFFF",
      fontSize: 20,
  }
});
