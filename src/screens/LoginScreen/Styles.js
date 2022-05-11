import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
	SafeAreaView: {
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor:  "salmon",
		flex: 1,
	},
	head: {
		backgroundColor: "gold",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	login: {
		backgroundColor: "dodgerblue",
		flex: 2,
		alignItems: "center",
	},
});