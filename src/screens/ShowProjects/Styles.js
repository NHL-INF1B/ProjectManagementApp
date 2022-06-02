import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
	Container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#009BAA',
        paddingHorizontal: 15,
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
	}
});