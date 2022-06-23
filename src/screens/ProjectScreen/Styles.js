import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  Container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#009BAA",
    paddingHorizontal: 15,
    flex: 1,
    alignItems: "center",
  },
  Img: {
    height: 150,
    width: 150,
  },
  ProjectName: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    marginBottom: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
});