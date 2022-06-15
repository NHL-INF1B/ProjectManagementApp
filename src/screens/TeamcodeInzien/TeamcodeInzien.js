import * as React from 'react';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <WebView 
      source={{ uri: 'http://127.0.0.1/PMA/PmaAPI/uploads/teamcodes/teamcode1.pdf' }}
    />
  );
}
