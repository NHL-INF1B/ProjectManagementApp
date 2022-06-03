import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  Container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#009BAA",
    paddingHorizontal: 15,
    flex: 1,
//     flexWrap: "wrap",
    alignItems: "center",
  },
  Tiles: {
    backgroundColor: "#009BAA",
    flex: 1,
    flexDirection: "row",
//     flexWrap: "wrap",
  },
  Img: {
    height: 157,
    width: 157,
    marginTop: 30,
  },
  ProjectName: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    margin: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "25%",
  },
});
