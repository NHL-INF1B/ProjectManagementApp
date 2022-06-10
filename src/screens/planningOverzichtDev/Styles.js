import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
	SafeAreaView: {
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor: "#009BAA",
		flex: 1,
	},
    row: {
		flexDirection: 'row', 
        paddingVertical: 5,
		backgroundColor: "white",
		borderWidth: 2,
        borderRadius: 9,
        justifyContent: 'center',
		textAlign: 'left',
		fontWeight: 'bold',
		justifyContent: 'space-between',
		marginBottom: 10,
		

	},
	sectionHeader: {
		backgroundColor: "#00aabb",
		color: 'white',
		
	},
	sectionList: {
		flex: 1,
		paddingHorizontal: 20,
        paddingVertical: 10,
		textAlign: 'left',
      	fontSize: 20,
		backgroundColor: "#00aabb",
		
		
	},
	icon: {
		textAlign: 'right',
	},
});