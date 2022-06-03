'use strict';

import { Text, ScrollView, View, Pressable, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';

  const CreateProject = ({ navigation }) => {
    //form handling
    const NAME_REGEX = /^[a-zA-Z0-9 ]{3,30}$/;
    const { control, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        name: '',
      }
    });
    const onSubmit = (data) => {
      sendDataToAPI(data.name);
      // console.log(data.name);
    };

  //the things where the info goes in.
  // const [ProjectNaam, setProjectNaam] = useState('');

  const sendDataToAPI = (ProjectNaam) => {
    try {
        fetch("https://inf1b.serverict.nl/handlers/createproject/createProjectHandler.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: ProjectNaam,
            }),
        })
        .then((response) => response.text())
        .then((response) => {
            console.log(response);
            alert('Project aangemaakt');
        });
    } catch (error) {
        alert(error);
    }
};

  //the screen
return (
    <ScrollView style={styles.root}>
        <MaterialCommunityIcons style={styles.arrow}  name="arrow-left-thick" size={60} color={'black'} />
        <View style={styles.div}>
        <Circle name={"account-group"} size={60} color={"black"} style={[styles.icon,]} />
        </View>
        <View style={styles.div}>
        <Text style={[styles.title, styles.marginBottom25, styles.marginTop50, styles.sampleText,]}>PROJECT AANMAKEN</Text>
        </View>
        <View style={styles.inputContainer}>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: { value: true, message: 'Projectnaam is verplicht' },
                    pattern: {
                      value: NAME_REGEX,
                      message: 'Projectnaam moet tussen de 3 en 30 karakters bevatten én mag geen speciale karakters bevatten.',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <CustomTextInput style={styles.div}
                      placeholder="Projectnaam" 
                      placeholderTextColor="#707070" 
                      onChangeText={(text) => onChange(text)} 
                      value={value} 
                      errorText={errors?.name?.message} 
                      titleText="Projectnaam"
                    />
                  )}
                />
              </View>
        <Pressable onPress={handleSubmit(onSubmit)}>
        <Text style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}>AANMAKEN</Text>
        </Pressable>
    </ScrollView>
    );
};
  
export default CreateProject;
