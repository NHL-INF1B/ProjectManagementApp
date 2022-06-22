import { SafeAreaView, View, Pressable, ScrollView, Text, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import { useRoute } from "@react-navigation/native";
import Circle from '../../components/Circle/Circle';
import { useForm, Controller } from "react-hook-form";
import CustomButton from '../../components/CustomButton/CustomButton';
import Header from '../../components/Header/Header';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import handlerPath from '../../../env';

const HourEditScreen = ({navigation}) => {
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
    
    useEffect(() => {
        readData(id);
    }, []);

    const updateData = (data) => {
        editActivity(data);
        alert("De gegevens zijn succesvol aangepast");
        navigation.navigate("LogbookScreen",
        {
            projectId,
            userId,
        }
        );
    };

    const deleteData = (data) => {
        deleteActivity(data);
        alert("De gegevens zijn succesvol verwijderd");
        navigation.navigate("LogbookScreen",
        {
            projectId,
            userId,
        }
        );
    };

    // Selecting the data from the database based on id
    const readData = () => {
        fetch(handlerPath + "houredit/houreditSelectHandler.php", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
            })
        })
        .then((response) => response.json())
        .then((response) => {
            setValue("title", response.title);
            setValue("description", response.description);
            setValue("date", response.date);
            setValue("time_start", response.time_start);
            setValue("time_end", response.time_end);
            catchFeedback(response);
        })
    };

    // Updating the data based on id
    const editActivity = (data) => {
        try {
            fetch(handlerPath + "houredit/houreditUpdateHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    title: data.title,
                    description: data.description,
                    date: data.date,
                    time_start: data.time_start,
                    time_end: data.time_end,
                    userId: userId,
                    projectId, projectId,
                }),
            })
            .then((response) => response.json())
            .then((response) => {
                ;
                catchFeedback(response);
            });
        } catch (error) {
            alert(error);
        }
    };

    // Deleting an activity based on id
    const deleteActivity = (data) => {
        try {
            fetch(handlerPath + "houredit/houreditDeleteHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                }),
            })
            .then((response) => {
                ;
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
            case "data_updated":
                alert("De gegevens zijn geüpdate");
                break;
            case "data_deleted":
                alert("De gegevens zijn verwijderd");
                break;
            default:
                //
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
    const id = route.params.id;
    
    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <ScrollView>
                <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" />
                <View style={styles.marginBottom5}>
                    <Circle name={"clipboard-text"} size={60} color={"#000000"} text={"Urenverantwoording\nBewerken"} />
                </View>

                {/* Title */}
                <View>
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

                {/*  Description */}
                <View style={styles.marginBottom1}>
                    <Controller
                        name="description"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Beschrijving is verplicht' },
                            maxLength: {
                                value: 100,
                                message: 'Maximaal 100 tekens lang',
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
                                message: 'Start tijd is ongeldig',
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
                                maxLength={5}
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
                                message: 'Eind tijd is ongeldig',
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
                                maxLength={5}
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

                <View style={styles.marginBottom5}>
                    <CustomButton 
                        buttonType={"redButton"}
                        buttonText={"buttonText"}
                        text={"Verwijderen"}
                        onPress={() =>
                            Alert.alert("Weet je zeker dat je deze urenverantwoording wilt verwijderen?", "Er is geen mogelijkheid om dit terug te draaien!", [
                                { text: "Verwijderen", onPress: () => handleSubmit(deleteData) },
                                { text: "Annuleren" },
                            ])
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default HourEditScreen;