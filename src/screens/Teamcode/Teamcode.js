import { Text, ScrollView, Pressable, View, Button, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
// import { panGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';
import { useValidation} from 'react-native-form-validator';


const Teamcode = () => {
  const [Teamcode, setTeamcode] = useState('');

  const sendDataToAPI = (name, qrcode, teamcode) => {
    try {
        fetch("http://localhost:8080/PmaAPI/handlers/planning/planningHandler.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
               // planning: planning,
                name: name,
                qrcode: qrcode,
                teamcode: teamcode,
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

const { validate, isFieldInError, getErrorsInField, getErrorMessages, isFormValid } =
  useValidation({
      state: { Teamcode},
  });

  // const _checkValidation = () => {
  //   if(isFormValid() == true) {
  //     console.log("geen errors");
  //     //sendDataToAPI();
  //   } else if (isFormValid() == false) {
  //     console.log("wel errors");
  //   }
  // }

  const _onPressButton = () => {
    validate({
      teamcode: { minlength: 3, maxlength: 50, hasNoSpecialCharacter: true, required: true },
    }),
    _checkValidation();
  };

  const res = await DocumentPicker.pick({
    type: [DocumentPicker.types.allFiles],
});
this.setState({ singleFile: res });

// const data = new FormData();
// data.append('name', 'Image Upload');
// data.append('file_attachment', fileToUpload);

// let uploadImage = async () => {
//   //Check if any file is selected or not
//   if (singleFile != null) {
//     //If file selected then create FormData
//     const fileToUpload = singleFile;
//     const data = new FormData();
//     data.append('name', 'Image Upload');
//     data.append('file_attachment', fileToUpload);
//     let res = await fetch(
//       'http://localhost:8080/PmaAPI/handlers/planning/planningHandler.php',
//       {
//         method: 'post',
//         body: data,
//         headers: {
//           'Content-Type': 'multipart/form-data; ',
//         },
//       }
//     );
//     let responseJson = await res.json();
//     if (responseJson.status == 1) {
//       alert('Upload Successful');
//     }
//   } else {
//     //if no file selected the show alert
//     alert('Please Select File first');
//   }
// };

  return (
    <ScrollView style={styles.root}>
      <MaterialCommunityIcons style={styles.arrow}  name="arrow-left-thick" size={60} color={'black'} />
      <Circle name={"book-variant"} size={60} color={"Black"} style={styles.icon} />
      <Text style={[styles.title, styles.marginBottom25]}>Teamcode Toevoegen</Text>
      <Text style={styles.subtitle}>Teamcode</Text>
      <CustomTextInput style={styles.subtitle} onChangeText={setTeamcode} placeholder="Kies teamcode" value={Teamcode} setValue={setTeamcode} />
      {isFieldInError('Teamcode') &&
            getErrorsInField('Teamcode').map(ErrorMessage => (
                <Text style={[styles.sampleText]}>{ErrorMessage}</Text>
            ))}
      <Pressable onPress={_onPressButton}>
          <Text style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}>Toevoegen</Text>
      </Pressable>
      <View>
        <Button title="druk hier" onPress={() => sendDataToAPI(Teamcode)} />
      </View>
      
    </ScrollView>
  );
}



export default Teamcode;
  


