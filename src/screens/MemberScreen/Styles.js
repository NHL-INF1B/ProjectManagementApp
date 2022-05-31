import { StyleSheet, Platform, StatusBar} from 'react-native';

export default StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#009BAA',
        paddingHorizontal: 15,
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    profile: {
        minHeight: 97,
        maxHeight: 97,
        minWidth: 300,
        maxWidth: 300,
        backgroundColor: "white",
        borderColor: "#707070",
        borderRadius: 10,
        margin: 15,
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
    },
    user: {
        flex: 1,
        justifyContent: "center",
    },
    textName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#009BAA",
    }
})