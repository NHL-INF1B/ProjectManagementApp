import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
    SafeAreaView: {
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor: "#009BAA",
		flex: 1,
	},
    root: {
      backgroundColor: '#009BAA',
    },
    icon: {
      marginLeft: '19%',
      marginTop: '19%',
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
      fontSize: 20,

    },
    subtitle: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',

    },
    input: {
      textAlign: 'center',
      borderWidth: 1,
      borderColor: '#009BAA',
      padding: 1,
      width: '50%',
      backgroundColor: 'white',
      borderRadius: 5,
    },
    button: {
      width: '50%',
      marginLeft: '25%',
      textAlign: 'center',
      padding: 6,
      color: 'white',
      fontWeight: 'bold',
      borderRadius: 5,
      marginBottom: 5,
    },
    buttonBlue: {
      backgroundColor: '#005AAA',
      borderColor: '#066BC9',
    },
    buttonGreen: {
      backgroundColor: 'green',
      borderColor: '#008528',
    },
    buttonRed: {
      backgroundColor: 'red',
      borderColor: '#CB0005',
    },
    arrow: {
      textAlign: 'right',
      marginTop: 15,
    },
    marginTop25: {
      marginTop: 5,
    },
    marginBottom25: {
      marginBottom: 25,
    },
    marginBottom50: {
      marginBottom: 50,
    },
    textInput: {
      textAlign: 'center',
      borderWidth: 1,
      borderColor: '#009BAA',
      padding: 1,
      width: '50%',
      backgroundColor: 'white',
      borderRadius: 5,
  },
  });