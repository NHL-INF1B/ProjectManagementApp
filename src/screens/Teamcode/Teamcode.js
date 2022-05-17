import { Text, ScrollView, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
// import { panGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';

const Teamcode = () => {
  const [Activiteit, setActiviteit] = useState('');
  return (
    <ScrollView style={styles.root}>
      <MaterialCommunityIcons style={styles.arrow}  name="arrow-left-thick" size={60} color={'black'} />
      <Circle name={"book-variant"} size={60} color={"Black"} style={styles.icon} />
      <Text style={[styles.title, styles.marginBottom25]}>Teamcode Toevoegen</Text>
      <Text style={styles.subtitle}>Teamcode</Text>
      <CustomTextInput style={styles.subtitle} placeholder="Kies teamcode" value={Activiteit} setValue={setActiviteit} />
      <Pressable>
          <Text style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}>Toevoegen</Text>
      </Pressable>
    </ScrollView>
  );
}



export default Teamcode;
  


