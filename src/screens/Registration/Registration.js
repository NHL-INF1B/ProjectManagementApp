'use strict';

import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableHighlight, StyleSheet, Pressable } from 'react-native';
import { useValidation } from 'react-native-form-validator';

const FormTest = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { name, email, date, newPassword, confirmPassword },
    });

  const _onPressButton = () => {
    validate({
      name: { required: true },
      email: { email: true, required: true },
      date: { date: 'DD-MM-YYYY', required: true },
      newPassword: { required: true, isPassword: true },
      confirmPassword: { equalPassword: newPassword, required: true },
    });    
  };

  return (
    <SafeAreaView>
      <View>
      <TextInput 
        style={styles.input}
        onChangeText={setName} 
        value={name} 
        placeholder="Naam"
        />
      {isFieldInError('name') &&
        getErrorsInField('name').map(errorMessage => (
          <Text style={styles.text}>{errorMessage}</Text>
        ))}

      
      <TextInput 
        style={styles.input}
        onChangeText={setEmail} 
        value={email} 
        placeholder="Email"
        />
        {isFieldInError('email') &&
        getErrorsInField('email').map(errorMessage => (
          <Text style={styles.text}>{errorMessage}</Text>
        ))}


      
      <TextInput 
      style={styles.input}
        onChangeText={setDate} 
        value={date} 
        placeholder="Datum"
      />
      {isFieldInError('date') &&
        getErrorsInField('date').map(errorMessage => (
          <Text style={styles.text}>{errorMessage}</Text>
        ))}


      
      <TextInput
      style={styles.input}
        onChangeText={setNewPassword}
        value={newPassword}
        secureTextEntry={true}
        placeholder="Wachtwoord"
      />
      {isFieldInError('newPassword') &&
        getErrorsInField('newPassword').map(errorMessage => (
          <Text style={styles.text}>{errorMessage}</Text>
        ))}

        


      
      <TextInput
      style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry={true}
        placeholder='Confirm wachtwoord'
      />
      {isFieldInError('confirmPassword') &&
        getErrorsInField('confirmPassword').map(errorMessage => (
          <Text style={styles.text}>{errorMessage}</Text>
        ))}

      <Pressable onPress={_onPressButton}>
        <Text style={styles.button} >Submit</Text>
      </Pressable>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  View: {
    backgroundColor: '#009BAA'
},
input: {
  textAlign: 'center',
  borderWidth: 1,
  borderColor: '#009BAA',
  padding: 1,
  width: '50%',
  marginLeft: 90,
  backgroundColor: 'white',
  borderRadius: 5,
  margin: 10,
},
button: {
    width: '50%',
    marginLeft: 90,
    textAlign: 'center',
    padding: 6,
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#005AAA',
    borderColor: '#066BC9',
},
text: {
  textAlign: 'center',
  width: '50%',
  marginLeft: 90,
  marginBottom: 5,
  color: 'red',
}
})

export default FormTest;