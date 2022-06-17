import { Text, ScrollView, View, Pressable, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header/Header';
import {useRoute} from "@react-navigation/native";
import handlerPath from "../../../env";

const CreateProject = ({ navigation }) => {
  const NAME_REGEX = /^[a-zA-Z0-9 ]{3,30}$/;
  const [userId, setUserId] = useState("");

  const route = useRoute();
  const projectId = route.params.projectId;
  

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
    }
  });

  useEffect(() => {
    const data = getData();
    data.then((data) => {
      if (data !== undefined) {
        setUserId(data["id"]);
      }
    });
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user_data");
      if (jsonValue !== null) {
        return JSON.parse(jsonValue);
      }
    } catch (e) {
      alert(e);
    }
  };

  const onSubmit = (data) => {
    sendDataToAPI(data.name, userId);
  };

  const sendDataToAPI = (ProjectNaam, userid) => {
    try {
      fetch(handlerPath + "createproject/createProjectHandler.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: ProjectNaam,
          userid: userid
        }),
      })
        .then((response) => response.text())
        .then((response) => {
          ;
          alert('Project aangemaakt');
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
      <ScrollView style={styles.root}>
        <View style={styles.div}>
          <Circle name={"account-group"} size={60} color={"black"} style={[styles.icon,]} />
        </View>

        <View style={styles.div}>
          <Text style={[styles.title, styles.marginBottom25, styles.marginTop50, styles.sampleText,]}>PROJECT AANMAKEN</Text>
        </View>

        <View style={[styles.inputContainer, styles.marginBottom25]}>
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


        <CustomButton
          buttonType={"blueButton"}
          buttonText={"buttonText"}
          text={"Aanmaken"}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateProject;
