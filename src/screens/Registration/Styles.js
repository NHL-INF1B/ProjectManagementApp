import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#009BAA",
    flex: 1,
  },
  div: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#009BAA",
    padding: 1,
    width: "50%",
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
  },
  button: {
    width: "50%",
    marginLeft: 90,
    textAlign: "center",
    padding: 6,
    color: "white",
    fontWeight: "bold",
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: "#005AAA",
    borderColor: "#066BC9",
  },
  text: {
    textAlign: "center",
    width: "50%",
    marginLeft: 90,
    marginBottom: 5,
    color: "red",
  },
});
