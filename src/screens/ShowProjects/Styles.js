import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
	Container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#009BAA",
        flex: 1,
        alignItems: 'center',
	}
});