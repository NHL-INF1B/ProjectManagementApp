import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
	SafeAreaView: {
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor: "#009BAA",
		flex: 1,
	},
    row: {
        // paddingHorizontal: 10,
		flexDirection: 'row', 
        paddingVertical: 5,
		backgroundColor: "white",
		borderWidth: 2,
        borderRadius: 9,
        justifyContent: 'center',
		textAlign: 'left',
		fontWeight: 'bold',
		justifyContent: 'space-between',
		// padding: 10,
		marginBottom: 10,
		

	},
	sectionHeader: {
		// backgroundColor: '#efefef',
		backgroundColor: "#00aabb",
		color: 'white',
		
	},
	sectionList: {
		flex: 1,
		paddingHorizontal: 20,
        paddingVertical: 10,
		textAlign: 'left',
      	// color: "#00aabb",
      	// fontWeight: 'bold',
      	fontSize: 20,
		backgroundColor: "#00aabb",
		
		
	},
	icon: {
		textAlign: 'right',
		// flexDirection: 'row',
		// marginLeft: '19%',
		// marginTop: '19%',
	},
});