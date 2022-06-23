import { StatusBar } from 'expo-status-bar';
import { Dimensions, Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    SafeAreaView: {
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
		backgroundColor:  '#009BAA',
		flex: 1,
    },  
    root: {
      flex: 1,
      backgroundColor: '#009BAA',
    },
    div: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 25,
    },
    marginTop25: {
      marginTop: 25,
    },
    marginTop50: {
      marginTop: 50,
    },
    marginBottom25: {
      marginBottom: 25,
    },
    errorMessage: {
      textAlign: 'center',
      color:'red',
      fontWeight: 'bold',
    },
    successMessage: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
    },
    pdf: {
      flex: 1,
      width: Dimensions.get('window').width,
    },
});
