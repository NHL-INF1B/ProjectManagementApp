import { ScrollView, View, SafeAreaView, Pressable, Text } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import Header from '../../components/Header/Header';
import { useForm, Controller } from "react-hook-form";
import CustomButton from '../../components/CustomButton/CustomButton';
import DatePicker from 'react-native-modern-datepicker';
import { useRoute } from "@react-navigation/native";
import HourTimer from '../../components/HourTimer/HourTimer';

const HourAddScreen = () => {

    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            title: "",
            description: "",
            date: "",
            time_start: "",
            time_end: "",
        }
    });

    const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
    const TIME_REGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

    const submitData = (data) => {
        sendDataToAPI(data);
        alert("De gegevens zijn opgeslagen");
    };

    //Inserting the data into the database
    const sendDataToAPI = (data) => {
        try {
            fetch("http://localhost/ReactNativeAPI/PmaAPI/handlers/houredit/houreditInsertHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: data.title,
                    description: data.description,
                    date: data.date,
                    time_start: data.time_start,
                    time_end: data.time_end,
                    user_id: user_id,
                    project_id: project_id,
                }),
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setValue("title", response.title);
                setValue("description", response.description);
                setValue("date", response.date);
                setValue("time_start", response.time_start);
                setValue("time_end", response.time_end);
                setValue("user_id", response.user_id);
                setValue("project_id", response.project_id);
                catchFeedback(response);
            });
        } catch (error) {
            alert(error);
        }
    };

    const replaceAll = (string, search, replace) => {
        return string.split(search).join(replace);
    }

    const catchFeedback = (response) => {
        switch (response) {
            case "title_incorrect":
                alert("De activiteit is incorrect");
                break;
            case "description_incorrect":
                alert("De beschrijving is incorrect");
                break;
            case "date_incorrect":
                alert("De datum is incorrect");
                break;
            case "time_start_incorrect":
                alert("De start tijd is incorrect");
                break;
            case "time_end_incorrect":
                alert("De eind tijd is incorrect");
                break;
            case "title_timer_incorrect":
                alert("De activiteit is incorrect");
                break;
            case "description_timer_incorrect":
                alert("De beschrijving is incorrect");
                break;
            case "times_invalid":
                alert("De tijden zijn ongeldig");
                break;
            default:
                console.log("De gegevens zijn opgeslagen");
                break;
          }
	};

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
    };

    const route = useRoute();
    const userId = route.params.userId;
    const projectId = route.params.projectId;

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <ScrollView style={styles.SafeAreaView}>
                <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" />
                <View style={styles.marginBottom5}>
                    <Circle name={"clipboard-text"} size={60} color={"#000000"} text={"Urenverantwoording\nToevoegen"} />
                </View>

                {/* Title */}
                <View style={styles.marginBottom1}>
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Activiteit is verplicht' },
                            maxLength: {
                                value: 50,
                                message: 'Maximaal 50 tekens lang',
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <CustomTextInput 
                                placeholder="Activiteit" 
                                onChangeText={(text) => onChange(text)} 
                                value={value} 
                                errorText={errors?.title?.message} 
                                titleText="Activiteit"
                            />
                        )}
                    />
                </View>

                {/* Description */}
                <View style={styles.marginBottom1}>
                    <Controller
                        name="description"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Beschrijving is verplicht' },
                            maxLength: {
                                value: 50,
                                message: 'Maximaal 50 tekens lang',
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <CustomTextInput 
                                placeholder="Beschrijving" 
                                onChangeText={(text) => onChange(text)} 
                                value={value} 
                                errorText={errors?.description?.message} 
                                titleText="Beschrijving"
                            />
                        )}
                    />
                </View>

                {/* Date */}
                {isDatePickerVisible ? (
                    <View style={styles.marginContainer}>
                        <Controller
                            name="date"
                            control={control}
                            rules={{
                                required: { value: true, message: 'Datum is verplicht' },
                                pattern: {
                                    value: DATE_REGEX,
                                    message: 'Datum is incorrect'
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    style={{width:"70%", alignSelf: "center", borderWidth: 3, borderRadius: 10, borderColor: '#00AABB',}}
                                    onSelectedChange={date => onChange(replaceAll(date, "/", "-"))}
                                    current={getValues("date")}
                                    mode="calendar"
                                    maximumDate={new Date().toJSON().slice(0,10).replace(/-/g,'/')}
                                />
                            )}
                        />
                        {errors?.date?.message && (
                            <Text style={styles.errorText}>{errors?.date?.message}</Text>
                        )}
                    </View>
                ) : (
                    <View style={styles.marginContainer}>
                        <Pressable>
                            <Controller
                                name="date"
                                control={control}
                                rules={{
                                    required: { value: true, message: 'Datum is verplicht' },
                                    pattern: {
                                        value: DATE_REGEX,
                                        message: 'Datum is incorrect'
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <View>
                                        <CustomTextInput
                                        placeholder="Kies een datum"
                                        placeholderTextColor="#707070"
                                        onFocus={() => setDatePickerVisibility(true)}
                                        onChangeText={(text) => onChange(text)}
                                        value={getValues("date")}
                                        errorText={errors?.date?.message}
                                        titleText="Datum"
                                        onc
                                        />
                                    </View>
                                )}
                            />
                        </Pressable>
                    </View>
                    )
                }

                {/* Time_start */}
                <View style={styles.marginBottom1}>
                    <Controller
                        name="time_start"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Start tijd is verplicht' },
                            maxLength: {
                                value: 5,
                                message: 'Maximaal 5 tekens lang',
                            },
                            pattern: {
                                value:TIME_REGEX,
                                message: 'Start tijd is incorrect'
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <CustomTextInput 
                                placeholder="Start tijd" 
                                onChangeText={(text) => onChange(text)} 
                                value={value} 
                                errorText={errors?.time_start?.message} 
                                titleText="Start tijd"
                            />
                        )}
                    />
                </View>

                {/* Time_end */}
                <View style={styles.marginBottom1}>
                    <Controller
                        name="time_end"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Eind tijd is verplicht' },
                            maxLength: {
                                value: 5,
                                message: 'Maximaal 5 tekens lang',
                            },
                            pattern: {
                                value:TIME_REGEX,
                                message: 'Eind tijd is incorrect'
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <CustomTextInput 
                                placeholder="Eind tijd" 
                                onChangeText={(text) => onChange(text)} 
                                value={value} 
                                errorText={errors?.time_end?.message} 
                                titleText="Eind tijd"
                            />
                        )}
                    />
                </View>

                <View style={styles.marginBottom5}>
                    <CustomButton 
                        buttonType={"blueButton"}
                        buttonText={"buttonText"}
                        text={"Toevoegen"}
                        onPress={handleSubmit(submitData)}
                    />
                </View>

                <HourTimer />
                
            </ScrollView>
        </SafeAreaView>
    );
}

export default HourAddScreen;