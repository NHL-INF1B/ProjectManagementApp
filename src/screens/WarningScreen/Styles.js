import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  SafeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#009BAA",
    flex: 1,
  },
  Title: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 25,
    textAlign: "center",
  },
  marginTop1: {
    marginTop: '1%',
  },
  marginBottom1: {
    marginBottom: '1%',
  },
  marginTop5: {
    marginTop: '5%',
  },
  marginBottom5: {
    marginBottom: '5%',
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  },
  nothingFound: {
    marginTop: 50,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
});
