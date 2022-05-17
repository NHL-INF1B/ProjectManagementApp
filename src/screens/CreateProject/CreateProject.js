'use strict';

import { Text, ScrollView, TextInput, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useValidation } from 'react-native-form-validator';
// import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
// import { set } from 'react-native-reanimated';

const CreateProject = ()=> {
  const [ProjectNaam, setProjectNaam] = useState('');

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
  useValidation({
      state: { ProjectNaam},
  });

  const _onPressButton = () => {
    validate({
      ProjectNaam: { minlength: 3, maxlength: 30, required: true },
    });
  };
return (
    <ScrollView style={styles.root}>
        <MaterialCommunityIcons style={styles.arrow}  name="arrow-left-thick" size={60} color={'black'} />
        <Circle name={"account-group"} size={60} color={"black"} style={styles.icon} />
        <Text style={[styles.title, styles.marginBottom25]}>PROJECT AANMAKEN</Text>
        <Text style={styles.subtitle}>PROJECTNAAM</Text>
        <TextInput style={[styles.textInput]} onChangeText={setProjectNaam} value={ProjectNaam} placeholder={'PROJECTNAAM'}/>
        {isFieldInError('date' &&
            getErrorsInField('date').map(ErrorMessage => (
                <text>{ErrorMessage}</text>
            )))}
        <Pressable onPress={_onPressButton}>
        <Text style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}>AANMAKEN</Text>
        </Pressable>
        {/* <Pressable>
            <Text style={[styles.button, styles.buttonBlue, styles.marginTop25, styles.marginBottom25]}>AANMAKEN</Text>
        </Pressable>    */}
        <Text>{getErrorMessages()}</Text>
    </ScrollView>
    );
};
  
export default CreateProject;






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
>>>>>>> Stashed changes
