import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  SafeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#009BAA",
    flex: 1,
  },
  inputFields: {
    flexDirection: "row",
    alignSelf: "center",
    width: "70%",
    marginBottom: 10,
    borderColor: "#009BAA",
    borderWidth: 1,
    backgroundColor: "white",
    padding: 1,
    borderRadius: 5,
    textAlign: "center"
  },
  icon: {
    width: "10%",
    alignSelf: "center",
  },
  input: {
    width: "90%",
  },
});
