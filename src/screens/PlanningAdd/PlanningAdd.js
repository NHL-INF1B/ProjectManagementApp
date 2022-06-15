import { Text, ScrollView, Pressable, View, Button, TextInput, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import { useForm, Controller } from "react-hook-form";
import CustomButton from '../../components/CustomButton/CustomButton';

const PlanningAdd = () => {
    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            activity: "",
            weeknummer: "",
        }
    });


    const sendDataToAPI = (activiteit, week, project_id) => {
        try {
            fetch("http://localhost:8080/PmaAPI/handlers/planning/planningHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // planning: planning,
                    week: week,
                    activiteit: activiteit,
                    project_id: project_id,
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
        <SafeAreaView style={styles.SafeAreaView}>
            <ScrollView>
                <View>
                    <Circle name={"calendar-month"} size={60} color={"black"} text={"Planning Toevoegen"} />
                </View>

                <View style={styles.marginContainer}>
                    <Controller
                        name="activity"
                        control={control}
                        rules={{
                            required: { value: true, message: 'activity is verplicht' },
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
                                titleText="activity"
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
                        onPress={handleSubmit()}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default PlanningAdd;