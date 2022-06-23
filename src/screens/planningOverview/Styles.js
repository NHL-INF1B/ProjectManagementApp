import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
	SafeAreaView: {
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor: "#009BAA",
		flex: 1,
	},

    row:{
        flex: 1,
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        minHeight: 50,
        padding: 10,
        margin: 8,
        borderWidth: 3,
        borderRadius: 20,
        borderColor: '#009BAA',
        backgroundColor:'white',
    },
	sectionHeader: {
		alignSelf: "center",
		width: "90%",
		backgroundColor: "#009BAA",
		fontWeight:"bold",
		color: 'white',
		minWidth: "80%",
		fontSize: 18,
        flexShrink: 1,
	},
	sectionList: {
		flex: 1,
		paddingHorizontal: 20,
        paddingVertical: 10,
		textAlign: 'left',
      	fontSize: 22,
		// backgroundColor: "#009BAA",
		// backgroundColor: "#00aabb",

	},
	test: {
		textAlign: 'left'

	},

    activity: {
        minWidth: "80%",
        flexShrink: 1,
    },
    change: {
        minWidth: "5%", 
        alignItems: "center",
        justifyContent: "center",
    },
	activityText: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	icon: {
		textAlign: 'right',
		fontWeight: 'bold',
	},
	nothingFound: {
		marginTop: 50,
		color: "#FFFFFF",
		fontWeight: "bold",
		fontSize: 25,
		textAlign: "center",
	},
	title: {
		fontWeight: "bold",
		color: "#FFFFFF",
		fontSize: 25,
		alignSelf: "center",
	  },
});