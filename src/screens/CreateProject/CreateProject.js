import { Text, ScrollView, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';

const CreateProject = ()=> {
  const [ProjectNaam, setProjectNaam] = useState('');
    return (

    <ScrollView style={styles.root}>
        <MaterialCommunityIcons style={styles.arrow}  name="arrow-left-thick" size={60} color={'black'} />
        <Circle name={"account-group"} size={60} color={"black"} style={styles.icon} />
        <Text style={[styles.title, styles.marginBottom25]}>PROJECT AANMAKEN</Text>
        <Text style={styles.subtitle}>PROJECTNAAM</Text>
        <CustomTextInput style={[styles.customTextInput]} placeholder="Projectnaam" value={ProjectNaam} setValue={setProjectNaam} />
        <Pressable>
            <Text style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}>AANMAKEN</Text>
        </Pressable>   
    </ScrollView>
    );
}
  
export default CreateProject;

