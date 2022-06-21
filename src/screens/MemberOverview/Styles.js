import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
	SafeAreaView: {
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor: "#009BAA",
		flex: 1,
	},
	marginContainer: {
		marginBottom: 12,
	},
	head: {
		flex: 1,
		backgroundColor: "#009BAA",
		justifyContent: "center",
	},
	content: {
		flex: 2,
		backgroundColor: "#009BAA",
	},
	errorText: {
        textAlign: "center",
        color: "red",
        fontWeight: "bold",
    },
	registreren: {
		alignSelf: "center",
		textDecorationLine: "underline",
		color: "white",
		textTransform: "uppercase",
	}, 
	dropdown: {
		border: 1,
		backgroundColor: "white",
	}
});
