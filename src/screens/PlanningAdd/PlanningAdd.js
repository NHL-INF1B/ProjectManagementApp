import { Text, ScrollView, Pressable, View, Button, TextInput, SafeAreaView } from 'react-native';
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
    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            activity: "",
            weeknummer: "",
        }
    });

    const submitData = (data) => {
        sendDataToAPI(data);
    };

    const route = useRoute();
    const userId = route.params.userId;
    const projectId = route.params.projectId;

    const sendDataToAPI = (data) => {
        try {
            fetch(handlerPath + "planning/planningHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // planning: planning,
                    week: data.weeknummer,
                    activiteit: data.activity,
                    project_id: projectId,
                }),
            })
                //.then((response) => response.text())
                .then((response) => response.json())
                .then((response) => {
                    // catchFeedback(response);
                });
        } catch (error) {
            alert(error);
        }
    };


    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
            <ScrollView>
                <View>
                    <Circle name={"calendar-month"} size={60} color={"black"} text={"Planning Toevoegen"} />
                </View>

                <View style={styles.marginContainer}>
                    <Controller
                        name="activity"
                        control={control}
                        rules={{
                            required: { value: true, message: 'activiteit is verplicht' },
                            maxLength: {
                                value: 50,
                                message: 'Maximaal 50 tekens lang',
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <CustomTextInput
                                placeholder="activity"
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
                            required: { value: true, message: 'weeknummer is verplicht' },
                            maxLength: {
                                value: 50,
                                message: 'Maximaal 50 tekens lang',
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