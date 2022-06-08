import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { View, SafeAreaView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import Circle from "../../components/Circle/Circle";
import Header from "../../components/Header/Header";

const ChangePassword = ({ route }) => {
    //get the userId from the last page.
    const { userId, projectId } = route.params;

    //regex to check if the password is safe
    const PASS_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,254}$/;

    //the variables for the input data.
    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    });

    //when the button gets pushed it sends data to the API
    const submitData = (data) => {
        sendUpdateData(data);
    };

    //send and fetch the feedback from the API.
    const sendUpdateData = (data) => {
        try {
			fetch("http://localhost/pma/PmaAPI/handlers/changePassword/changePassword.php", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
                body: JSON.stringify({
                    id: userId,
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword,
                    confirmPassword: data.confirmPassword,
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
    }

    //catch the feedback from the API and give a alert.
    const catchFeedback = (response) => {
        switch (response[0]) {
            case "wrong_old_password":
              alert("Huidig wachtwoord is verkeerd");
              break;
            case "password_incorrect":
              alert("Nieuw wachtwoord is verkeerd.");
              break;
            case "confirmPassword_incorrect":
              alert("Bevestig wachtwoord is verkeerd.");
              break;
            case "samePassword_incorrect":
              alert("De wachtwoorden zijn niet hetzelfde.");
              break;
            case "password_changed":
                alert("Het wachtwoord is veranderd");
                break;
            default:
              console.log('undefined');
              break;
          }
	};

    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
            <View style={Styles.head}>
                    <Circle name={"account"} size={80} color={"black"} text={"Wachtwoord veranderen"} />
            </View>

            <View style={Styles.content}>
                <View style={Styles.marginContainer}>
                    <Controller
                        name="oldPassword"
                        control={control}
                        rules={{
                            required: { value: true, message: "Huidig wachtwoord is verplicht." },
                            pattern: {
                            value: PASS_REGEX,
                            message: "Verkeerde wachtwoord",
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                        <CustomTextInput
                            placeholder="Huidig wachtwoord"
                            placeholderTextColor="#707070"
                            onChangeText={(text) => onChange(text)}
                            value={value}
                            errorText={errors?.oldPassword?.message}
                            secureTextEntry={true}
                            titleText="Huidig wachtwoord"
                        />
                        )}
                    />
                </View>

                <View style={Styles.marginContainer}>
                    <Controller
                        name="newPassword"
                        control={control}
                        rules={{
                            required: { value: true, message: "Nieuw wachtwoord is verplicht." },
                            pattern: {
                            value: PASS_REGEX,
                            message: "Wachtwoord is te zwak",
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                        <CustomTextInput
                            placeholder="Nieuw wachtwoord"
                            placeholderTextColor="#707070"
                            onChangeText={(text) => onChange(text)}
                            value={value}
                            errorText={errors?.newPassword?.message}
                            secureTextEntry={true}
                            titleText="Nieuw wachtwoord"
                        />
                        )}
                    />
                </View>

                <View style={Styles.marginContainer}>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        rules={{
                            required: { value: true, message: "Bevestig wachtwoord is verplicht." },
                            pattern: {
                            value: PASS_REGEX,
                            message: "Wachtwoord is te zwak",
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                        <CustomTextInput
                            placeholder="Bevestig wachtwoord"
                            placeholderTextColor="#707070"
                            onChangeText={(text) => onChange(text)}
                            value={value}
                            errorText={errors?.confirmPassword?.message}
                            secureTextEntry={true}
                            titleText="Bevestig wachtwoord"
                        />
                        )}
                    />
                </View>

                <View style={Styles.marginContainer}>
                    <CustomButton 
                        buttonType={"blueButton"}
                        buttonText={"buttonText"}
                        text={"Verander Wachtwoord"}
                        onPress={handleSubmit(submitData)}
                    />
                </View>
            </View>
        </SafeAreaView>

    );
}
export default ChangePassword;