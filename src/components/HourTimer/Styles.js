import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
    SafeAreaView: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "#009BAA",
      flex: 1,
    },
    icon: {
      alignSelf: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
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
    }
  });