'use strict';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, Pressable } from 'react-native';
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
      newPassword: { required: true },
      confirmPassword: { equalPassword: newPassword, required: true },
    });
    if(!getErrorsInField('name')){
      console.log('geen errors');
    }
  };

  return (
    <View>
      
      
      <TextInput 
      style={styles.input}
        onChangeText={setName} 
        value={name} 
        placeholder="Naam"
        />
      {isFieldInError('name') &&
        getErrorsInField('name').map(errorMessage => (
          <Text>{errorMessage}</Text>
        ))}

      
      <TextInput 
        onChangeText={setEmail} 
        value={email} 
        placeholder="Email"
        />
        {isFieldInError('email') &&
        getErrorsInField('email').map(errorMessage => (
          <Text>{errorMessage}</Text>
        ))}


      
      <TextInput 
        onChangeText={setDate} 
        value={date} 
        placeholder="Datum"
      />
      {isFieldInError('date') &&
        getErrorsInField('date').map(errorMessage => (
          <Text>{errorMessage}</Text>
        ))}


      
      <TextInput
        onChangeText={setNewPassword}
        value={newPassword}
        secureTextEntry={true}
        placeholder="Wachtwoord"
      />
      {isFieldInError('newPassword') &&
        getErrorsInField('newPassword').map(errorMessage => (
          <Text>{errorMessage}</Text>
        ))}


      
      <TextInput
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry={true}
        placeholder='Confirm wachtwoord'
      />
      {isFieldInError('confirmPassword') &&
        getErrorsInField('confirmPassword').map(errorMessage => (
          <Text>{errorMessage}</Text>
        ))}

      <Pressable onPress={_onPressButton}>
        <Text style={styles.button} >Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex:1
},
input: {
  marginTop: 20,
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
}
})

export default FormTest;