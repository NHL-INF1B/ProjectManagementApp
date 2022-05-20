import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  SafeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#009BAA",
    flex: 1,
  },
  div: {
    justifyContent: "center",
    alignSelf: "center",
    width: "70%",
    marginBottom: 10,
  },
});
