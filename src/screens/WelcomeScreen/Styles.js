import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#009BAA",
    paddingHorizontal: 15,
    flex: 1,
    alignItems: "center",
  },
  safeAreaView: {
    backgroundColor: "#009BAA",
    flex: 1,
    flexWrap: "wrap",
  },
  img: {
    height: 150,
    width: 150,
    marginTop: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "30%",
  },
  text: {
    flex: 2,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
  icon: {
    flex: 2,
    paddingTop: 15,
  },
  uitloggen: {
    minWidth: 135,
    maxWidth: 135,
    minHeight: 141,
    maxHeight: 141,
    backgroundColor: "red",
    borderColor: "#707070",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    margin: 15,
  },
  welkom: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
});
