import { Text, ScrollView, View, Alert } from 'react-native';
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

const EditProject = ({ navigation }) => {
    const NAME_REGEX = /^[a-zA-Z0-9 ]{3,30}$/;
    const [userId, setUserId] = useState("");

    //Get the projectId from the last page.
    const route = useRoute();
    const projectId = route.params.projectId;
  
    //The const for the input data.
    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            name: "",
            qrcode: "",
            teamcode: "",
        }
    });

    //When the page opens.
    useEffect(() => {
        readData(projectId);
        const data = getData();
        data.then((data) => {
            if (data !== undefined) {
                setUserId(data["id"]);
            }
        });
    }, []);

    //send input data to edit project.
    const updateData = (data) => {
        editProject(data);
    };

    //send input data to delete project.
    const deleteData = (data) => {
        deleteProject(data); 
    };

    //get the data from the async storage.
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

    // Selecting the data from the database based on id
    const readData = () => {
        fetch(handlerPath + "createproject/selectProjectHandler.php", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: projectId,
            })
        })
        .then((response) => response.json())
        .then((response) => {
            setValue("name", response.name);
            setValue("qrcode", response.qrcode);
            setValue("teamcode", response.teamcode)
            catchFeedback(response);
        })
    };

    // Updating the data based on id
    const editProject = (data) => {
        try {
            fetch(handlerPath + "editproject/editProjectHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: projectId,
                    name: data.name,
                    qrcode: data.qrcode,
                }),
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                catchFeedback(response);
            });
        } catch (error) {
            alert(error);
        }
    };

    // Deleting a project based on id
    const deleteProject = (data) => {
        try {
            fetch(handlerPath + "editproject/deleteProjectHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: projectId,
                }),
            })
            .then((response) => response.json())
            .then((response) => {
                catchFeedback(response);
            });
        } catch (error) {
            alert(error);
        }
    };

    //catch the feedback from the API's and giving an alert.
    const catchFeedback = (response) => {
        switch (response) {
            case "data_updated":
                navigation.goBack();
                alert("De gegevens zijn succesvol aangepast");
                break;
            case "data_deleted":
                navigation.navigate("WelcomeScreen");
                alert("De gegevens zijn succesvol verwijderd");
                break;
            default:
                //
                break;
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
                <Text style={[styles.title, styles.marginBottom25, styles.marginTop50, styles.sampleText,]}>PROJECT BEWERKEN</Text>
            </View>

            <View style={[styles.inputContainer, styles.marginBottom1]}>
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

            <View style={styles.marginBottom1}>
                <CustomButton 
                    buttonType={"blueButton"}
                    buttonText={"buttonText"}
                    text={"Bewerken"}
                    onPress={handleSubmit(updateData)}
                />
            </View>

            <View>
                <CustomButton 
                    buttonType={"redButton"}
                    buttonText={"buttonText"}
                    text={"Verwijderen"}
                    onPress={() =>
                        Alert.alert("Weet je zeker dat je dit project wilt verwijderen?", "Er is geen mogelijkheid om dit terug te draaien!", [
                            { text: "Verwijderen", onPress: deleteData },
                            { text: "Annuleren" },
                        ])
                    }
                />
            </View>

        </ScrollView>
    </SafeAreaView>
  );
};

export default EditProject;
