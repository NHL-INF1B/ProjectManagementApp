import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { ScrollView, View, Text, SafeAreaView, Button, Image, TouchableOpacity, Pressable, Platform, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import Circle from "../../components/Circle/Circle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';

const Profile = ({ navigation }) => {
    const NUMMERIC_REGEX = /^[0-9]*$/;
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const DISCORD_REGEX = /^.{3,32}#[0-9]{4}$/;
    const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

    const [isShowingDatePicker, setShowingDatePicker] = useState(false);

    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            name: "",
            email: "",
            dateOfBirth: "",
            phoneNumber: "",
            discord: "",
        }
    });

    useEffect(() => {
        const data = getData();
        data.then((data) => {
            if (data !== undefined) {
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

    const getUserData = (userId) => {
        console.log(userId);
		try {
			fetch("http://localhost/pma/PmaAPI/handlers/profile/profileFetch.php", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: userId,
				}),
			})
            // .then((response) => response.text())
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setValue("name", response.name);
                setValue("email", response.email);
                setValue("dateOfBirth", response.dateOfBirth);
                setValue("phoneNumber", response.phoneNumber);
                setValue("discord", response.discord);
            });
		} catch (error) {
			alert(error);
		}
	};

    const sendUpdateData = (data) => {
        console.log(data);
        // try {
		// 	fetch("http://localhost/pma/PmaAPI/handlers/profile/profileEdit.php", {
		// 		method: "POST",
		// 		headers: {
		// 			Accept: "application/json",
		// 			"Content-Type": "application/json",
		// 		},
        //         body: JSON.stringify({
        // 			   activity: data.activity,
        //             week: data.week,
        //             scheduleId : scheduleId,
		// 		}),
		// 	})
		// 		// .then((response) => response.text())
		// 		.then((response) => response.json())
		// 		.then((response) => {
        //             catchFeedback(response);
		// 		});
		// } catch (error) {
		// 	alert(error);
		// }
    }

	const catchFeedback = (response) => {
        switch (response) {
            case "data_updated":
              alert("Data is geüpdatet");
              navigation.navigate("ScheduleEditScreen"); //kan ook planning scherm worden
              break;
            case "data_deleted":
              alert("De planning is verwijderd");
              navigation.navigate("ScheduleEditScreen"); //moet planning scherm worden
              break;
            default:
              console.log('not defined');
              break;
          }
	};

	return (
		<SafeAreaView style={Styles.SafeAreaView}>
            <View style={Styles.head}>
                <View>
                    <Circle name={"account"} size={80} color={"black"} text={"Profiel bewerken"} />
                </View>
            </View>
            
            <View style={Styles.content}>
                <ScrollView>
                    <View style={Styles.marginContainer}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: { value: true, message: 'Naam is verplicht' },
                                maxLength: {
                                    value: 50,
                                    message: 'Maximaal 50 tekens lang',
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <CustomTextInput 
                                    placeholder="Naam" 
                                    onChangeText={(text) => onChange(text)} 
                                    value={value} 
                                    errorText={errors?.name?.message} 
                                    titleText="Naam"
                                />
                            )}
                        />
                    </View>

                    <View style={Styles.marginContainer}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: { value: true, message: 'Email is verplicht' },
                                pattern: {
                                    value: EMAIL_REGEX,
                                    message: 'Dit email is niet correct'
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'Maximaal 50 karakters lang',
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <CustomTextInput 
                                    placeholder="Emailadres" 
                                    onChangeText={(text) => onChange(text)} 
                                    value={value} 
                                    keyboardType="email-address"
                                    errorText={errors?.email?.message} 
                                    titleText="Email"
                                />
                            )}
                        />
                    </View>

                    {isShowingDatePicker ? (
                        <View style={Styles.marginContainer}>
                            <Controller
                                name="dateOfBirth"
                                control={control}
                                rules={{
                                    required: { value: true, message: 'Geboortedatum is verplicht' },
                                    pattern: {
                                        value: DATE_REGEX,
                                        message: 'Geboortedatum is incorrect'
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <DatePicker
                                        style={{width:"70%", alignSelf: "center", borderWidth: 3, borderRadius: 10, borderColor: '#00AABB',}}
                                        onSelectedChange={date => onChange(date.replaceAll("/", "-"))}
                                        current={getValues("dateOfBirth")}
                                        mode="calendar"
                                        maximumDate={new Date().toJSON().slice(0,10).replace(/-/g,'/')}
                                    />
                                )}
                            />
                            {errors?.dateOfBirth?.message && (
                                <Text style={Styles.errorText}>{errors?.dateOfBirth?.message}</Text>
                            )}
                        </View>
                    ) : (
                        <View style={Styles.marginContainer}>
                            <Pressable onPress={() => setShowingDatePicker(true)}>
                            <Controller
                                name="dateOfBirth"
                                control={control}
                                rules={{
                                    required: { value: true, message: 'Datum is verplicht' },
                                    pattern: {
                                        value: DATE_REGEX,
                                        message: 'Datum is incorrect'
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <CustomTextInput
                                    placeholder="Kies een datum"
                                    placeholderTextColor="#707070"
                                    onChangeText={(text) => onChange(text)}
                                    value={getValues("dateOfBirth")}
                                    errorText={errors?.dateOfBirth?.message}
                                    titleText="Geboortedatum"
                                    />
                                )}
                            />

                            </Pressable>
                        </View>
                    )
                    }

                    <View style={Styles.marginContainer}>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            rules={{
                                pattern: {
                                    value: NUMMERIC_REGEX,
                                    message: 'Telefoonnummer mag alleen cijfers bevatten'
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'Maximaal 50 cijfers lang',
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <CustomTextInput 
                                    placeholder="Telefoonnummer" 
                                    onChangeText={(text) => onChange(text)} 
                                    value={value} 
                                    keyboardType = "numeric"
                                    errorText={errors?.phoneNumber?.message} 
                                    titleText="Telefoonnummer"
                                />
                            )}
                        />
                    </View>

                    <View style={Styles.marginContainer}>
                        <Controller
                            name="discord"
                            control={control}
                            rules={{
                                pattern: {
                                    value: DISCORD_REGEX,
                                    message: 'Discord tag klopt niet'
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <CustomTextInput 
                                    placeholder="Discord tag" 
                                    onChangeText={(text) => onChange(text)} 
                                    value={value}
                                    errorText={errors?.discord?.message} 
                                    titleText="Discord"
                                />
                            )}
                        />
                    </View>

                    <View style={Styles.marginContainer}>
                        <CustomButton 
                            buttonType={"blueButton"}
                            text={"Aanpassen"}
                            onPress={handleSubmit(submitData)}
                        />
                    </View>
                </ScrollView>   
            </View>
            
		</SafeAreaView>
	);
}

export default Profile;
