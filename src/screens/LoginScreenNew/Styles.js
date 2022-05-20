import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
	SafeAreaView: {
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor:  "#009BAA",
		flex: 1,
	},
	head: {
		backgroundColor: "#009BAA",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	login: {
		backgroundColor: "#009BAA",
		flex: 2,
		alignItems: "center",
	},
	logo: {
		resizeMode: "center",
		height: 200,
		alignSelf: "center",
		marginBottom: 20,
		marginTop: 30,
	},
	titel: {
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 30,
		color: "white",
		margin: 10,
	},
	button:	{
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
	registreren: {
		alignSelf: "center",
		marginTop: 10,
		textDecorationLine: "underline",
		color: "white",
		fontWeight: "bold",
	}
});