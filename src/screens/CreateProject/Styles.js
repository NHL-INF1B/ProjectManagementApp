import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  SafeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#009BAA",
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: "#009BAA",
  },
  div: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  marginTop50: {
    marginTop: 50,
  },
  marginBottom1: {
    marginBottom: "1%",
  },
  marginBottom25: {
    marginBottom: 25,
  },
});
