import * as React from 'react';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <WebView 
      source={{uri: 'inf1b.serverict.nl/uploads/teamcodes/teamcode' + $projectId + '.pdf', 'w'}}
    />
  );
}
