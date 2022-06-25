import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { View, Text, SafeAreaView, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import Circle from "../../components/Circle/Circle";
import handlerPath from "../../../env";
import { useRoute } from '@react-navigation/native';
import Header from "../../components/Header/Header";

const ScheduleEditScreen = ({ navigation }) => {

    //get the projectid, userid and scheduleid form the last page.
    const route = useRoute();
    const projectId = route.params.projectId;
    const userId = route.params.userId;
    const scheduleId = route.params.planningId;
    const NUMMERIC_REGEX = /^[0-9]*$/;

    //declaring the const.
    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            activity: "",
            week: "",
        }
    });

    //get the schedule data when the page opens.
    useEffect(() => {
        getScheduleData(scheduleId);
	}, []);

    //send the data when the button is pressed.
    const submitData = (data) => {
        sendUpdateData(data);
    };

    //get the schedule data and get feedback
    const getScheduleData = () => {
		try {
			fetch(handlerPath + "planning/planningEditFetch.php", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					scheduleId: scheduleId,
				}),
			})  
            .then((response) => response.json())
            .then((response) => {
                setValue("week", response.week);
                setValue("activity", response.activity);
            });
		} catch (error) {
			alert(error);
		}
	};

    //send the updated data and get the feedback.
    const sendUpdateData = (data) => {
        try {
			fetch(handlerPath + "planning/planningEdit.php", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
                body: JSON.stringify({
					activity: data.activity,
                    week: data.week,
                    scheduleId : scheduleId,
				}),
			})
				.then((response) => response.json())
				.then((response) => {
                    catchFeedback(response);
				});
		} catch (error) {
			alert(error);
		}
    }

    //remove the data that is send and get feedback.
    const sendRemoveData = () => {
        try {
			fetch(handlerPath + "planning/planningDelete.php", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
                body: JSON.stringify({
                    scheduleId : scheduleId,
				}),
			})
				.then((response) => response.json())
				.then((response) => {
                    catchFeedback(response);
				});
		} catch (error) {
			alert(error);
		}
    }

    //catch the feedback from the API and give an alert.
	const catchFeedback = (response) => {
        switch (response) {
            case "data_updated":
              alert("Data is geüpdatet");
              navigation.goBack();
              break;
            case "data_deleted":
              alert("De planning is verwijderd");
              navigation.goBack();
              break;
            default:
              break;
          }
	};

	return (
		<SafeAreaView style={Styles.SafeAreaView}>
            <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />

            <View style={Styles.head}>
                <View>
                    <Circle name={"calendar-month"} size={60} color={"black"} text={"planning bewerken"} />
                </View>
            </View>
            
            <View style={Styles.content}>
                <View style={Styles.marginContainer}>
                    <Controller
                        name="activity"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Activiteit is verplicht' },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <CustomTextInput 
                                placeholder="Activiteit"
                                onChangeText={(text) => onChange(text)} 
                                value={value} 
                                errorText={errors?.activity?.message} 
                                titleText="Activiteit"
                            />
                        )}
                    />
                </View>


                <View style={Styles.marginContainer}>
                    <Controller
                        name="week"
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
                                placeholder="Weeknummer" 
                                onChangeText={(text) => onChange(text)} 
                                value={value} 
                                keyboardType = "numeric"
                                errorText={errors?.week?.message} 
                                titleText="week"
                            />
                        )}
                    />
                </View>

                <View style={Styles.marginContainer}>
                    <CustomButton 
                        buttonType={"blueButton"}
                        buttonText={"buttonText"}
                        text={"Bewerken"}
                        onPress={handleSubmit(submitData)}
                    />
                </View>

                <View>
                    <CustomButton 
                        buttonType={"redButton"}
                        text={"Verwijderen"}
                        // onPress={() => 
                        //     Alert.alert("Weet je zeker dat je deze planning wilt verwijderen?", "Er is geen mogelijkheid om dit terug te draaien!",
                        //     [   
                        //         { text: "Verwijderen", onPress: () => sendRemoveData() },
                        //         { text: "Annuleren" },
                        //     ]
                        //     )
                        // }
                        onPress={handleSubmit(sendRemoveData)}
                    />
                </View>
            </View>
            
		</SafeAreaView>
	);
}

export default ScheduleEditScreen;
