import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { ScrollView, View, Text, SafeAreaView, Button, Image, TouchableOpacity, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import CustomButton from "../../components/CustomButton/CustomButton";

const ScheduleEditScreen = ({ navigation }) => {
    const [activityText, setActivityText] = useState("dingen doen");
    const [weekText, setWeekText] = useState("5");
    const { control, handleSubmit, formState: { errors }, getValues } = useForm({
        defaultValues: {
            activity: activityText,
            week: weekText,
        }
    });

    useEffect(() => {
        //call functon getscheduledata
	}, []);

	const updateData = (data) => {
		//call functon sendupdatedata
	};
    const removeData = (data) => {
		//call functon sendremovedata
	};

	const sendUpdateData = (email, password) => {
		try {
			fetch("http://localhost/pma/PmaAPI/handlers/login/loginHandler.php", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			})
				// .then((response) => response.text())
				.then((response) => response.json())
				.then((response) => {
					// console.log(response);
					catchFeedback(response);
				});
		} catch (error) {
			alert(error);
		}
	};

    const getScheduleData = (email, password) => {
		try {
			fetch("http://localhost/pma/PmaAPI/handlers/login/loginHandler.php", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			})
				// .then((response) => response.text())
				.then((response) => response.json())
				.then((response) => {
					// console.log(response);
					catchFeedback(response);
				});
		} catch (error) {
			alert(error);
		}
	};

	const catchFeedback = (response) => {
        //Doe iets met de data dat binnenkomt
	};

	return (
		<SafeAreaView style={Styles.SafeAreaView}>
            <View>
            <Controller
					name="activity"
					control={control}
					rules={{
						required: { value: true, message: 'activity is verplicht' },
					}}
					render={({ field: { onChange, value } }) => (
						<CustomTextInput 
							placeholder="Activiteit"
							onChangeText={(text) => onChange(text)} 
							value={value} 
							errorText={errors?.activity?.message} 
							titleText="activity"
						/>
					)}
				/>
            </View>
            <View>
            <Controller
					name="week"
					control={control}
					rules={{
						required: { value: true, message: 'week is verplicht' },
					}}
					render={({ field: { onChange, value } }) => (
						<CustomTextInput 
							placeholder="Weeknummer" 
							onChangeText={(text) => onChange(text)} 
							value={value} 
							errorText={errors?.week?.message} 
							titleText="week"
						/>
					)}
				/>
            </View>

            <View>
                <CustomButton 
                    buttonType={"blueButton"}
                    text={"Bewerken"}
                />
            </View>

            <View>
                <CustomButton 
                    buttonType={"redButton"}
                    text={"Verwijderen"}
                />
            </View>
		</SafeAreaView>
	);
}

export default ScheduleEditScreen;
