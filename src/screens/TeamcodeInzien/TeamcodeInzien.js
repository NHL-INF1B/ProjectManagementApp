import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header/Header";
import Styles from "../TeamcodeToevoegen/Styles";

export default function App() {
  const route = useRoute();
  const userId = route.params.userId;
  const projectId = route.params.projectId;
  const navigateToHidden = () => {
    navigate("Schermpie");
  };

  return (
    <SafeAreaView style={Styles.SafeAreaView}>
      <Header
        GoToType="Add"
        GoTo="TeamcodeToevoegen"
        CenterGoTo="None"
        ReturnType="Back"
        projectId={projectId}
        userId={userId}
      />
      <Text style={Styles.successMessage}>Het bestand is gedownload</Text>

      <WebView
        style={{ backgroundColor: "#009BAA" }}
        source={{
          uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        }}
      />
    </SafeAreaView>
  );
}
