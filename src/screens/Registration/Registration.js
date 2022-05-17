import React, {useState} from 'react';
import { View, TextInput, Text, Button, StyleSheet, Keyboard } from 'react-native';
import { InputAccessoryView } from 'react-native-web';


const Registration = () => {
  const [errors, setErrors] = useState({});
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [datum, setDatum] = useState("");
  const [wachtwoord, setWachtwoord] = useState("");
  const [confirmWachtwoord, setConfirmWachtwoord] = useState("");

  const validate = () => {
    if
  };



  return (
    <View>
      <Text>Naam</Text>
      <TextInput 
        defaultValue={naam}
        onChangeText={(value) => setNaam(value)}
        autoCapitalize="none"
        placeholder='Naam'
      />
      <Text>Email</Text>
      <TextInput 
        defaultValue={email}
        onChangeText={(value) => setEmail(value)}
        autoCapitalize="none"
        placeholder='email'
        textContentType='emailAddress'
      />
      <Text>Datum</Text>
      <Text>Wachtwoord</Text>
      <TextInput
        defaultValue={wachtwoord}
        onChangeText={(value) => setWachtwoord(value)}
        autoCapitalize="none"
        placeholder='Wachtwoord'
        secureTextEntry
        autoCorrect={false}
        textContentType='password'
      />
      <Text>Nog een wachtwoord</Text>
      <TextInput
        defaultValue={confirmWachtwoord}
        onChangeText={(value) => setConfirmWachtwoord(value)}
        autoCapitalize="none"
        placeholder='Wachtwoord'
        secureTextEntry
        autoCorrect={false}
        textContentType='password'
      />

    <Button title="Registreer" onPress={validate}/>
      
    </View>
  );
}


const styles = StyleSheet.create({
  datePickerStyle: {
    width: 200,
    marginTop: 20,
},
})


export default Registration;