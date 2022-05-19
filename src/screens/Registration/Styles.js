import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#009BAA",
    flex: 1,
  },
  div: {
    justifyContent: "center",
    alignSelf: "center",
    width: "70%",
    marginBottom: 10,
  },
  input: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#009BAA",
    padding: 1,
    backgroundColor: "white",
    borderRadius: 5,
  },
  button: {
    width: "70%",
    textAlign: "center",
    padding: 6,
    color: "white",
    fontWeight: "bold",
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "#005AAA",
    borderColor: "#066BC9",
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    width: "100%",
    alignSelf: "center",
    color: "red",
    fontWeight: "bold",
  },
  logo: {
    resizeMode: "center",
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  inloggen: {
    alignSelf: "center",
    marginTop: 10,
    textDecorationLine: "underline",
    color: "white",
    fontWeight: "bold",
  },
  titel: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    margin: 10,
  },
});
