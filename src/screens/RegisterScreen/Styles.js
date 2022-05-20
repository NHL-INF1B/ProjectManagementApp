import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
  SafeAreaView: {
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor:  "#009BAA",
		flex: 1,
  },
  container: {
    backgroundColor: "#009BAA",
    flex: 1,
    flexDirection: "column"
  },
  head: {
    flex: 1,
    justifyContent: "center",
		alignItems: "center",
  },
  content: {
    flex: 2,
  },
  inputContainer : {
    marginBottom: 12,
  },
  logo: {
		resizeMode: "center",
		height: 200,
		alignSelf: "center",
		marginBottom: 20,
		marginTop: 30,
	},
  inloggen:{
    alignSelf: "center",
    marginTop: 10,
    textDecorationLine: "underline",
    color: "white",
    fontWeight: "bold",
  },
  button: {
    width: "70%",
		textAlign: "center",
		padding: 10,
		color: "white",
		fontWeight: "bold",
		borderRadius: 5,
		marginTop: 5,
		backgroundColor: "#005AAA",
		borderColor: "#066BC9",
		alignSelf: "center",
  },
  titel:  {
    alignSelf: "center",
		fontWeight: "bold",
		fontSize: 30,
		color: "white",
		margin: 10,
  }
});
