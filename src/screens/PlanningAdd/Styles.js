import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  SafeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#009BAA",
    flex: 1,
  },
  marginContainer: {
    marginBottom: 12,
  },
  marginBottom: {
    marginBottom: 25,
  },
});
