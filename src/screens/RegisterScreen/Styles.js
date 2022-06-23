import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
  SafeAreaView: {
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor:  "#009BAA",
		flex: 1,
  },
  head: {
    flex: 1,
    backgroundColor: "#009BAA",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    flex: 2,
    backgroundColor: "#009BAA",
  },
  inputContainer : {
    marginBottom: 12,
  },
  redirectContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  redirectText: {
    color: "white",
    textTransform: "uppercase",
    textDecorationLine: "underline",
    marginBottom: 25,
  },
  logo: {
		resizeMode: "center",
		height: 200,
		alignSelf: "center",
		marginBottom: 20,
		marginTop: 30,
  },
  title:  {
    alignSelf: "center",
		fontWeight: "bold",
		fontSize: 30,
		color: "white",
		margin: 10,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  },
});
