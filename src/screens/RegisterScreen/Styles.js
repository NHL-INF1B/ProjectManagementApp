import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
  SafeAreaView: {
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor:  "#009BAA",
		flex: 1,
  },
  container: {
    backgroundColor: "#009BAA",
    flex: 1,
    flexDirection: "column"
  },
  head: {
    flex: 1,
    justifyContent: "center",
		alignItems: "center",
  },
  content: {
    flex: 2,
    backgroundColor: "salmon",
  },
  inputContainer : {
    marginBottom: 12,
  },
});
