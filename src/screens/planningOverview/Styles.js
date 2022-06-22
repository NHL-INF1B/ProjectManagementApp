import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
	SafeAreaView: {
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor: "#009BAA",
		flex: 1,
	},
	sectionList: {
		flex: 1,
		paddingHorizontal: 20,
        paddingVertical: 10,
		textAlign: 'left',
      	fontSize: 20,
		backgroundColor: "#009BAA",	
	},
	nothingFound: {
		marginTop: 50,
		color: "#FFFFFF",
		fontWeight: "bold",
		fontSize: 25,
		textAlign: "center",
	},
});