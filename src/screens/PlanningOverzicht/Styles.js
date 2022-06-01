import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  root: {
      backgroundColor: '#009BAA',
  },
  dropdown: {
    alignSelf: 'center',
    padding: '0.4%',
  },
  circle: {
    width: '10%',
    height: 100,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'black',
    backgroundColor: 'white',
    },
  icon: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
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
  whitetext: {
    color: 'white',
  },
  button: {
    width: '50%',
    textAlign: 'center',
    padding: '.5%',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 5,
    alignSelf: 'center',
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
    marginTop: '5%',
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
  SafeAreaView: {
	paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	backgroundColor: "#009BAA",
	flex: 1,
	},
  container: {
    flex: 1,
    backgroundColor: '#eafffe'
  },

  screen: {
    marginTop: 18,
  },
  header: {
    fontSize: 30,
    color: "#FFF",
    marginTop: 10,
    padding: 2,
    backgroundColor: "#C2185B",
    textAlign: "center",
  },
  row: {
    marginHorizontal: 15,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  rowText: {
    fontSize: 18,
  },
  sectionHeader: {
    backgroundColor: '#efefef',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});