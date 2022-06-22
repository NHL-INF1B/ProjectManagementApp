import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
	SafeAreaView: {
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor: "#009BAA",
		flex: 1,
	},
    miniContainer: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        minHeight: 100,
        padding: 10,
        margin: 8,
        borderWidth: 3,
        borderRadius: 20,
        borderColor: 'white',
        backgroundColor:'white',
    },
    textContainer : {
        minWidth: "70%",
        flexShrink: 1,
        color: "white",
        fontWeight: "bold",
    },
    iconContainer: {
        minWidth: "30%", 
        alignItems: "center",
        justifyContent: "center",
    },
    name: {
        fontWeight: "bold", 
        fontSize: 20,
        color: '#009BAA',
    }, 
    pointsContainer: {
        flexDirection: "row"
    },
    points: {
        color: '#FFD700',
        fontWeight: "bold",
        fontSize: 18,
        paddingLeft: 5,
    }

});