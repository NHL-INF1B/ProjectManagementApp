import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  SafeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#009BAA",
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  QRCode: {
    marginTop: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 15,
    marginBottom: 10,
  },
});
