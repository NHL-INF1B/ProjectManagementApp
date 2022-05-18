'use strict';

import { Text, ScrollView, Pressable, View, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';

const Planning = () => {
  const [Activiteit, setActiviteit] = useState('');
  const [weeknummer, setWeeknummer] = useState('');


  const sendDataToAPI = (planning, week, activiteit, project_id) => {
    try {
        fetch("http://localhost:8080/PmaAPI/handlers/planning/planningHandler.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                planning: planning,
                week: week,
                activiteit: activiteit,
                project_id: project_id,
            }),
        })
       // .then((response) => response.text())
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
      state: { PlanningNaam},
  });

  const _checkValidation = () => {
    if(isFormValid() == true) {
      console.log("geen errors");
      sendDataToAPI();
    } else if (isFormValid() == false) {
      console.log("wel errors");
    }
  }

  const _onPressButton = () => {
    validate({
      PlanningtNaam: { minlength: 3, maxlength: 30, hasNoSpecialCharacter: true, required: true },
    }),
    _checkValidation();
  };

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
      <View>
        <Button title="druk hier" onPress={() => sendDataToAPI("planning", "week", "activiteit", "project_id")} />
      </View>

      {/* <Button
        title="Toevoegen"
        style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}
        onPress={() =>
        Alert.alert("Test titel", "Test bericht",
        [
          { text: "Toevoegen", onPress: () => console.log("Toevoegen geklikt")}
        ])}

      /> */}

         {isFieldInError('planning' &&
            getErrorsInField('planning').map(ErrorMessage => (
                <Text style={[styles.sampleText]}>{ErrorMessage}</Text>
            )))}
                    <Text style={styles.errorMessage}>{getErrorMessages()}</Text>
        <Pressable onPress={_onPressButton}>
        <Text style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}>AANMAKEN</Text>
        </Pressable>

    </ScrollView>
  );
}

export default Planning;
  


// 'use strict';

// import { Text, ScrollView, View, TextInput, Pressable, } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import React, { useState } from 'react';
// import { useValidation } from 'react-native-form-validator';
// import styles from './Styles';
// import Circle from '../../components/Circle/Circle';
// // import { set } from 'react-native-reanimated';
// // import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';

// const CreateProject = ()=> {
//   const [ProjectNaam, setProjectNaam] = useState('');

//   const sendDataToAPI = () => {
//     try {
//         fetch("http://localhost/ProjectManagementApp/src/screens/LoginScreen/handler.php", {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 test: "stefan",
//             }),
//         })
//         .then((response) => response.json())
//         .then((response) => console.log(response));
//     } catch (error) {
//         alert(error);
//     }
// };

//   const { validate, isFieldInError, getErrorsInField, getErrorMessages, isFormValid } =
//   useValidation({
//       state: { ProjectNaam},
//   });

//   const _checkValidation = () => {
//     if(isFormValid() == true) {
//       console.log("geen errors");
//       sendDataToAPI();
//     } else if (isFormValid() == false) {
//       console.log("wel errors");
//     }
//       else {
//         console.log("dikke kutzooi");
//     }
//   }

//   const _onPressButton = () => {
//     validate({
//       ProjectNaam: { minlength: 3, maxlength: 30, hasNoSpecialCharacter: true, required: true },
//     }),
//     _checkValidation();
//   };
// return (
//     <ScrollView style={styles.root}>
//         <MaterialCommunityIcons style={styles.arrow}  name="arrow-left-thick" size={60} color={'black'} />
//         <View style={styles.div}>
//         <Circle name={"account-group"} size={60} color={"black"} style={[styles.icon,]} />
//         </View>
//         <View style={styles.div}>
//         <Text style={[styles.title, styles.marginBottom25, styles.marginTop50, styles.sampleText,]}>PROJECT AANMAKEN</Text>
//         </View>
//         <View style={styles.div}> 
//         <Text style={[styles.subtitle, styles.sampleText,]}>PROJECTNAAM</Text>
//         </View>
//         <View style={styles.div}>
//         <TextInput style={[styles.textInput,]} onChangeText={setProjectNaam} value={ProjectNaam} placeholder={'PROJECTNAAM'}/>
//         </View>
//         {isFieldInError('projectNaam' &&
//             getErrorsInField('projectNaam').map(ErrorMessage => (
//                 <Text style={[styles.sampleText]}>{ErrorMessage}</Text>
//             )))}
//                     <Text style={styles.errorMessage}>{getErrorMessages()}</Text>
//         <Pressable onPress={_onPressButton}>
//         <Text style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}>AANMAKEN</Text>
//         </Pressable>
//     </ScrollView>
//     );
// };
  
// export default CreateProject;






// 'use strict';

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableHighlight } from 'react-native';
// import { useValidation } from 'react-native-form-validator';

// const FormTest = () => {
//   const [name, setName] = useState('My name');
//   const [email, setEmail] = useState('tibtib@gmail.com');
//   const [number, setNumber] = useState('56');
//   const [date, setDate] = useState('2017-03-01');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
//     useValidation({
//       state: { name, email, number, date, newPassword, confirmPassword },
//     });

//   const _onPressButton = () => {
//     validate({
//       name: { minlength: 3, maxlength: 7, required: true },
//       email: { email: true },
//       number: { numbers: true },
//       date: { date: 'YYYY-MM-DD' },
//       confirmPassword: { equalPassword: newPassword },
//     });
//   };

//   return (
//     <View>
//       <TextInput onChangeText={setName} value={name} />
//       <TextInput onChangeText={setEmail} value={email} />
//       <TextInput onChangeText={setNumber} value={number} />
//       <TextInput onChangeText={setDate} value={date} />
//       {isFieldInError('date') &&
//         getErrorsInField('date').map(errorMessage => (
//           <Text>{errorMessage}</Text>
//         ))}

//       <TextInput
//         onChangeText={setNewPassword}
//         value={newPassword}
//         secureTextEntry={true}
//       />
//       <TextInput
//         onChangeText={setConfirmPassword}
//         value={confirmPassword}
//         secureTextEntry={true}
//       />
//       {isFieldInError('confirmPassword') &&
//         getErrorsInField('confirmPassword').map(errorMessage => (
//           <Text>{errorMessage}</Text>
//         ))}

//       <TouchableHighlight onPress={_onPressButton}>
//         <Text>Submit</Text>
//       </TouchableHighlight>

//       <Text>{getErrorMessages()}</Text>
//     </View>
//   );
// };

// export default FormTest;