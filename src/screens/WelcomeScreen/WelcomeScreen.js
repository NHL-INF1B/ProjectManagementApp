import { StatusBar } from 'expo-status-bar';
import { Image, View, SafeAreaView, Text, Linking } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import Styles from './Styles';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={Styles.container}>
        <Image 
            style={Styles.img}
            source={require('./../../assets/images/logo.png')}
        />
        <SafeAreaView style={Styles.safeAreaView}>
        <View style={Styles.tile}>
        <MaterialCommunityIcons name='account-group' size={60} color="#009BAA" style={Styles.icon}/>
        <Text style={Styles.text}>Projecten</Text>
        </View>
        <View style={Styles.tile}>
        <MaterialCommunityIcons name='card-account-details' size={60} color="#009BAA" style={Styles.icon}/>
        <Text style={Styles.text}>Profiel</Text>
        </View>
        <View style={Styles.uitloggen}>
        <MaterialCommunityIcons name='logout' size={60} color="#009BAA" style={Styles.icon}/>
        <Text style={Styles.text}>Uitloggen</Text>
        </View>
        <StatusBar style="auto" />
        </SafeAreaView>
    </SafeAreaView>
  );
};



