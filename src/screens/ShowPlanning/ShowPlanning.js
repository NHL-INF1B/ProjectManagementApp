import { Text, ScrollView, Pressable, View, Button, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
// import Circle from '../../components/Circle/Circle';
// import { panGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';


const getPlanningFromApi = () => {
  const [getPlanningFromApi, setPlanning] = useState('');

  const sendDataToAPI = (planning) => {
    try {
        fetch("http://localhost:8080/PmaAPI/handlers/planning/planningHandler.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
               // planning: planning,
                // name: name,
                // qrcode: qrcode,
               // teamcode: teamcode,
            }),
        })
     //.then((response) => response.text())
      .then((response) => response.json())
        .then((response) => {
            console.log(response);
            // catchFeedback(response);
        });
    } catch (error) {
        alert(error);
    }
};

return (
    <ScrollView style={styles.root}>
      <MaterialCommunityIcons style={styles.arrow}  name="arrow-left-thick" size={60} color={'black'} />
      {/* <View style={[styles.div, styles.marginBottom50]}>
      <Circle name={"book-variant"} size={60} color={"Black"} style={styles.icon} />
      </View> */}
      <View style={{ flex: 1, padding: 24 }}>
    {isLoading ? <ActivityIndicator/> : (
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <Text>{item.activiteit} </Text>
        )}
      />
    )}
  </View>
      <Text style={[styles.title, styles.marginBottom25]}>Show Planning</Text>
      <Text style={styles.subtitle}>Show Planning</Text>
      <CustomTextInput style={styles.subtitle} onChangeText={setPlanning} placeholder="dik" value={getPlanningFromApi} setValue={setPlanning} />

      <Pressable onPress={_onPressButton}>
          <Text style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}>Toevoegen</Text>
      </Pressable>
      <View>
        <Button title="druk hier" onPress={() => sendDataToAPI(ShowPlanning)} />
      </View>
    </ScrollView>
  );
}



export default getPlanningFromApi;
  


