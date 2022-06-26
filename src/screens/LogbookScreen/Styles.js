import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  SafeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#009BAA",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 25,
  },
  subtitle: {
      fontWeight: "bold",
      color: "#FFFFFF",
      fontSize: 20,
  },
  marginBottom5: {
    marginBottom: '5%',
  },
  nothingFound: {
    marginTop: 50,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 25,
  }
});
