import { Text, ScrollView, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';

const Planning = () => {
  const [Activiteit, setActiviteit] = useState('');
  const [weeknummer, setWeeknummer] = useState('');
  return (
    <ScrollView style={styles.root}>
      <MaterialCommunityIcons style={styles.arrow}  name="arrow-left-thick" size={60} color={'black'} />
      <Circle name={"calendar-month"} size={60} color={"Black"} style={styles.icon} />
      <Text style={[styles.title, styles.marginBottom25]}>Planning Toevoegen</Text>
      <Text style={styles.subtitle}>Activiteit</Text>
      <CustomTextInput style={styles.subtitle} placeholder="Activiteit" value={Activiteit} setValue={setActiviteit} />
      <Text style={styles.subtitle}>Weeknummer</Text>
      <CustomTextInput placeholder="Weeknummer" value={weeknummer} setValue={setWeeknummer} />
      <Pressable>
          <Text style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}>Toevoegen</Text>
      </Pressable>

      {/* <Button
        title="Toevoegen"
        style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}
        onPress={() =>
        Alert.alert("Test titel", "Test bericht",
        [
          { text: "Toevoegen", onPress: () => console.log("Toevoegen geklikt")}
        ])}

      /> */}


    </ScrollView>
  );
}

export default Planning;
  


