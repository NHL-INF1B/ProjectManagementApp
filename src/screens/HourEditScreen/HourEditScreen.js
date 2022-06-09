import { Text, ScrollView, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';

const HourEditScreen = () => {
  const [Activiteit, setActiviteit] = useState('');
  const [Datum, setDatum] = useState('');
  const [StartTijd, setStartTijd] = useState('');
  const [EindTijd, setEindTijd] = useState('');
  return (
    <ScrollView style={styles.root}>
      <MaterialCommunityIcons style={styles.arrow}  name="arrow-left-thick" size={60} color={'black'} />
      <Circle name={"clipboard-text"} size={60} color={"#009BAA"} style={styles.icon} />
      <Text style={[styles.title, styles.marginBottom25]}>Urenverantwoording{"\n"}Toevoegen</Text>
      <Text style={styles.subtitle}>Activiteit</Text>
      <CustomTextInput placeholder="Activiteit" value={Activiteit} setValue={setActiviteit} />
      <Text style={styles.subtitle}>Datum</Text>
      <CustomTextInput placeholder="Datum" value={Datum} setValue={setDatum} />
      <Text style={styles.subtitle}>Start Tijd</Text>
      <CustomTextInput placeholder="StartTijd" value={StartTijd} setValue={setStartTijd} />
      <Text style={styles.subtitle}>Eind Tijd</Text>
      <CustomTextInput placeholder="EindTijd" value={EindTijd} setValue={setEindTijd} />
      <Pressable>
          <Text style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}>Toevoegen</Text>
      </Pressable>
      <Circle name={"timer"} size={60} color={"#009BAA"} style={styles.icon} />
      <Text style={[styles.title, styles.marginBottom25]}>Timer</Text>
      <Text style={styles.subtitle}>Activiteit</Text>
      <CustomTextInput placeholder="Activiteit" value={Activiteit} setValue={setActiviteit} />

      {/* <Button
        title="Toevoegen"
        style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}
        onPress={() =>
        Alert.alert("Test titel", "Test bericht",
        [
          { text: "Toevoegen", onPress: () => console.log("Toevoegen geklikt")}
        ])}

      /> */}

      <Pressable>
          <Text style={[styles.button, styles.buttonGreen, styles.marginTop25]}>Start</Text>
          <Text style={[styles.button, styles.buttonRed, styles.marginBottom25]}>Stop</Text>
      </Pressable>
    </ScrollView>
  );
}

export default HourEditScreen;
  


