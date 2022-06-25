import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  SafeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#009BAA",
    flex: 1,
  },
  content: {
    flex: 2,
    backgroundColor: "#009BAA",
  },
  marginContainer: {
    marginBottom: 12,
  },
  head: {
    flex: 1,
    backgroundColor: "#009BAA",
    justifyContent: "center",
    alignItems: "center",
  },
});
