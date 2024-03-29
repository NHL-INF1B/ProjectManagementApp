import { ScrollView, View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import { useForm, Controller } from "react-hook-form";
import CustomButton from '../../components/CustomButton/CustomButton';
import Header from '../../components/Header/Header';
import { useRoute } from "@react-navigation/native";
import handlerPath from '../../../env';

const PlanningAdd = () => {
    //declaring the const.
    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            activity: "",
            weeknummer: "",
        }
    });

    //send data to API when the button is pressed.
    const submitData = (data) => {
        sendDataToAPI(data);
    };

    //get hte userid and projectid from the last page.
    const route = useRoute();
    const userId = route.params.userId;
    const projectId = route.params.projectId;

    //regex to check if number
    const NUMMERIC_REGEX = /^[0-9]*$/;

    //send the data to the API and get feedback.
    const sendDataToAPI = (data) => {
        try {
            fetch(handlerPath + "planning/planningHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    week: data.weeknummer,
                    activiteit: data.activity,
                    project_id: projectId,
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

    //catch the feedback from the API
    const catchFeedback = (response) => {
        switch (response[0]) {
            case "week_incorrect":
              alert("De week is verkeerd.");
              break;
            case "activiteit_incorrect":
              alert("De activiteit is verkeerd.");
              break;
            case "project_id_incorrect":
              alert("Het project id is verkeerd.");
              break;
            default:
                alert("De gegevens zijn opgeslagen");
              break;
          }
	};


    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
            <ScrollView>
                <View style={styles.marginBottom}>
                    <Circle name={"calendar-month"} size={60} color={"black"} text={"Planning Toevoegen"}/>
                </View>

                <View style={styles.marginContainer}>
                    <Controller
                        name="activity"
                        control={control}
                        rules={{
                            required: { value: true, message: 'activiteit is verplicht' },
                            maxLength: {
                                value: 50,
                                message: 'De Maximale lengte voor een planning is 50 tekens',
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <CustomTextInput
                                placeholder="activiteit"
                                onChangeText={(text) => onChange(text)}
                                value={value}
                                errorText={errors?.activity?.message}
                                titleText="activiteit"
                            />
                        )}
                    />
                </View>

                <View style={styles.marginContainer}>
                    <Controller
                        name="weeknummer"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Week is verplicht' },
                            pattern: {
                                value: NUMMERIC_REGEX,
                                message: 'Week mag alleen cijfers bevatten'
                            },
                            maxLength: {
                                value: 3,
                                message: 'Maximaal 3 cijfers lang',
                            }

                        }}
                        render={({ field: { onChange, value } }) => (
                            <CustomTextInput
                                placeholder="weeknummer"
                                onChangeText={(text) => onChange(text)}
                                value={value}
                                errorText={errors?.weeknummer?.message}
                                titleText="weeknummer"
                            />
                        )}
                    />
                </View>

                <View style={styles.marginContainer}>
                    <CustomButton
                        buttonType={"blueButton"}
                        text={"Toevoegen"}
                        onPress={handleSubmit(submitData)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default PlanningAdd;