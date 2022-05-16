import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
	SafeAreaView: {
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor: "#009BAA",
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	Tile: {
		minWidth: 135,
		maxWidth: 135,
		minHeight: 141,
		maxHeight: 141,
		backgroundColor: "white",
		borderColor: "#707070",
		borderRadius: 10,
		flex: 1,
		alignItems: "center",
		margin: 15,
	},
	Icon: {
		flex: 1,
	},
	Text: {
		flex: 2,
		color: "#009BAA",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 25,
	},
});