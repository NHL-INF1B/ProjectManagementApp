import { StyleSheet } from "react-native";

export default StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#009BAA',
    },
    div: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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
      padding: 0,
    },
    input: {
      textAlign: 'center',
      borderWidth: 1,
      borderColor: '#009BAA',
      padding: 1,
      width: '50%',
      backgroundColor: 'white',
      borderRadius: 5,
      justifyContent: 'center',
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
      marginTop: 25,
    },
    marginTop50: {
      marginTop: 50,
    },

    marginBottom25: {
      marginBottom: 25,
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
    errorMessage: {
      textAlign: 'center',
      color:'red',
      fontWeight: 'bold',

    },
});
