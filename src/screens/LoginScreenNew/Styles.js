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
	content: {
		flex: 2,
		backgroundColor: "#009BAA",
	},
	inputContainer : {
		marginBottom: 12,
	},
	logo: {
		resizeMode: "center",
		height: 200,
		alignSelf: "center",
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
		padding: 13,
		color: "white",
		fontWeight: "bold",
		borderWidth: 3,
		borderRadius: 10,
		backgroundColor: "#005AAA",
		borderColor: "#066BC9",
		alignSelf: "center",
		color:"white", 
		textTransform:"uppercase", 
		fontWeight: "bold"
	},
	registreren: {
		alignSelf: "center",
		textDecorationLine: "underline",
		color: "white",
		textTransform: "uppercase",
	}
});