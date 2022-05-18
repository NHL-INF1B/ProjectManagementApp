import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';
import HourEditScreen from './src/screens/HourEditScreen/HourEditScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen/LoginScreen';
import ProjectAanmaken from './src/screens/ProjectAanmaken/ProjectAanmaken';

export default function App() {
  return (
    <WelcomeScreen />
  );
}
