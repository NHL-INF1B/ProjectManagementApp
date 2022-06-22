import { WebView } from 'react-native-webview';
import { useRoute } from "@react-navigation/native";
import React from 'react';
import { Text, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header/Header";
import Styles from "../TeamcodeToevoegen/Styles";

export default function App() {
  const route = useRoute();
  const userId = route.params.userId;
  const projectId = route.params.projectId;
  return (
    <SafeAreaView style={Styles.SafeAreaView}>
      <Header GoToType="Add" GoTo="TeamcodeToevoegen" CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
      <ScrollView>
        <WebView 
          source={{uri: 'https://inf1b.serverict.nl/uploads/teamcodes/teamcode'+ projectId + '.pdf'}} 
        />
        <Text style={Styles.successMessage}>Het bestand is gedownload</Text>
      </ScrollView>
    </SafeAreaView>
    
  );
}
