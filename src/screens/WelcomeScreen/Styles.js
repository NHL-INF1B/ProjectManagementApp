import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

const _width = Dimensions.get('screen').width * 0.5;

export default StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#009BAA',
        paddingHorizontal: 15,
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    safeAreaView: {
        backgroundColor: '#009BAA',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    img: {
        height: 157,
        width: 157,
        marginTop: 30,
    },
    tile: {
        minWidth: 135,
        maxWidth: 135,
        minHeight: 141,
        maxHeight: 141,
        backgroundColor: 'white',
        borderColor: '#707070',
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        margin: 15,
    },
    text: {
        flex: 2,
        color: '#009BAA',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
    },
    icon: {
        flex: 2,
        paddingTop: 15,
    },
    uitloggen: {
        minWidth: 135,
        maxWidth: 135,
        minHeight: 141,
        maxHeight: 141,
        backgroundColor: 'red',
        borderColor: '#707070',
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        margin: 15,
    }
  });
  