import { SafeAreaView, View, Pressable, ScrollView, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import { useForm, Controller } from "react-hook-form";
import CustomButton from '../../components/CustomButton/CustomButton';
import Header from '../../components/Header/Header';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import handlerPath from '../../../env';


const HourEditScreen = ({navigation}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimeStartPickerVisible, setTimeStartPickerVisibility] = useState(false);
    const [isTimeStopPickerVisible, setTimeStopPickerVisibility] = useState(false);

    const showTimeStartPicker = () => {
        setTimeStartPickerVisibility(true);
    };

    const hideTimeStartPicker = () => {
        setTimeStartPickerVisibility(false);
    };

    const showTimeStopPicker = () => {
        setTimeStopPickerVisibility(true);
    };

    const hideTimeStopPicker = () => {
        setTimeStopPickerVisibility(false);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
    };

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
    
    const id = 1;
    useEffect(() => {
        readData(id);
    }, []);

    const updateData = (data) => {
        editActivity(data);
        readData(id);
        alert("De gegevens zijn succesvol aangepast");
    };

    const deleteData = (data) => {
        deleteActivity(data);
        readData(id);
        alert("De gegevens zijn succesvol verwijderd");
    };

    //Selecting the data from the database based on id
    const readData = (id) => {
        fetch(handlerPath + 'houredit/houreditSelectHandler.php', {
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

    //Updating the data based on id
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
    };

    //Deleting an activity based on id
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
            .then((response) => response.text())
            .then((response) => {
                console.log(response);
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
            default:
              console.log('Data not defined');
              break;
          }
	};
    
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
                                        />
                                    </View>
                                )}
                            />
                        </Pressable>
                    </View>
                    )
                }

                {/* Time start */}
                <View>
                    <Controller
                        name="time_start"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Start tijd is verplicht' },
                            pattern: {
                                message: 'Start tijd is incorrect'
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                        <View style={styles.marginBottom1}>
                            <Text style={styles.subtitle}>START TIJD</Text>
                            <CustomButton
                                buttonType={"lightBlueButton"}
                                buttonText={"buttonTextBlack"}
                                text={"Kies een start tijd"}
                                onPress={showTimeStartPicker}
                            />
                                <DateTimePickerModal
                                    isVisible={isTimeStartPickerVisible}
                                    mode="time"
                                    onConfirm={handleConfirm}
                                    onCancel={hideTimeStartPicker}
                                />
                        </View>
                        )}
                    />   
                </View>

                {/* Time end */}
                <View>
                    <Controller
                        name="time_end"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Eind tijd is verplicht' },
                            pattern: {
                                message: 'Eind tijd is incorrect'
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                        <View style={styles.marginBottom1}>
                            <Text style={styles.subtitle}>EIND TIJD</Text>
                            <CustomButton
                                buttonType={"lightBlueButton"}
                                buttonText={"buttonTextBlack"}
                                text={"Kies een eind tijd"}
                                onPress={showTimeStopPicker}
                            />
                            <DateTimePickerModal
                                isVisible={isTimeStopPickerVisible}
                                mode="time"
                                onConfirm={handleConfirm}
                                onCancel={hideTimeStopPicker}
                            />
                        </View>
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
                        onPress={handleSubmit(deleteData)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HourEditScreen;
  


