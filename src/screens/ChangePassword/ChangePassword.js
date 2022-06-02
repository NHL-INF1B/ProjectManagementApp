import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { ScrollView, View, Text, SafeAreaView, Button, Image, TouchableOpacity, Pressable, Platform, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import Circle from "../../components/Circle/Circle";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangePassword = ({ navigation }) => {
    const [userid, setUserId] = useState("");
    const PASS_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,254}$/;
    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    });

    useEffect(() => {
        const data = getData();
        data.then((data) => {
            if (data !== undefined) {
                setUserId(data["id"]);
                getUserData(data["id"]);
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

    const submitData = (data) => {
        sendUpdateData(data);
    };

    const sendUpdateData = (data) => {
        try {
			fetch("http://localhost/pma/PmaAPI/handlers/profile/profileEdit.php", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
                body: JSON.stringify({
                    id: userid,
				}),
			})
				// .then((response) => response.text())
				.then((response) => response.json())
				.then((response) => {
                    catchFeedback(response);
				});
		} catch (error) {
			alert(error);
		}
    }

    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <View style={Styles.head}>
                    <Circle name={"account"} size={80} color={"black"} text={"Wachtwoord veranderen"} />
            </View>

            <View style={Styles.content}>
                <View style={Styles.marginContainer}>
                    <Controller
                        name="oldPassword"
                        control={control}
                        rules={{
                            required: { value: true, message: "Wachtwoord is verplicht" },
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
                            errorText={errors?.password?.message}
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
                            required: { value: true, message: "Wachtwoord is verplicht" },
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
                            errorText={errors?.password?.message}
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
                            required: { value: true, message: "Wachtwoord is verplicht" },
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
                            errorText={errors?.password?.message}
                            secureTextEntry={true}
                            titleText="Bevestig wachtwoord"
                        />
                        )}
                    />
                </View>

                <View style={Styles.marginContainer}>
                    <CustomButton 
                        buttonType={"blueButton"}
                        text={"Verander Wachtwoord"}
                        onPress={handleSubmit(submitData)}
                    />
                </View>
            </View>
        </SafeAreaView>

    );
}
export default ChangePassword;