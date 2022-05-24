import { StyleSheet } from "react-native";

export default StyleSheet.create({
    root: {
      backgroundColor: '#009BAA',
    },
    circle: {
      width: 100,
      height: 100,
      borderWidth: 1,
      borderRadius: 100,
      borderColor: 'black',
      backgroundColor: 'white',
      },
    icon: {
      marginLeft: '19%',
      marginTop: '19%',
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
      marginLeft: 90,
      backgroundColor: 'white',
      borderRadius: 5,
    },
    button: {
      width: '50%',
      marginLeft: 90,
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
    }
  });