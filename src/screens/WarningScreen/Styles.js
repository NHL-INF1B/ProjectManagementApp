import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
	SafeAreaView: {
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor: "#009BAA",
		flex: 1,
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
  marginTop1: {
    marginTop: '1%',
  },
  marginBottom1: {
    marginBottom: '1%',
  },
  marginTop5: {
    marginTop: '5%',
  },
  marginBottom5: {
    marginBottom: '5%',
  },
});
