import { SafeAreaView, View, Pressable, ScrollView, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import { useForm, Controller } from "react-hook-form";
import CustomButton from '../../components/CustomButton/CustomButton';
import Header from '../../components/Header/Header';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';


const HourEditScreen = ({navigation}) => {
    const [isShowingDatePicker, setShowingDatePicker] = useState(false);
    const [isShowingTimeStartPicker, setShowingTimeStartPicker] = useState(false);
    const [isShowingTimeEndPicker, setShowingTimeEndPicker] = useState(false);
    const [data, setData] = useState([]);

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
    
    const TimeStartConsole = (data) => {
        console.log(data);
    };

    //Selecting the data from the database based on id
    const readData = (id) => {
        fetch('http://localhost/ReactNativeAPI/PmaAPI/handlers/houredit/houreditSelectHandler.php', {
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
        })
    };

    //Updating the data based on id
    const editActivity = (data) => {
        try {
            fetch("http://localhost/ReactNativeAPI/PmaAPI/handlers/houredit/houreditUpdateHandler.php", {
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
            });
        } catch (error) {
            alert(error);
        }
    };

    //Deleting an activity based on id
    const deleteActivity = (data) => {
        try {
            fetch("http://localhost/ReactNativeAPI/PmaAPI/handlers/houredit/houreditDeleteHandler.php", {
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
            });
        } catch (error) {
            alert(error);
        }
    };

    const replaceAll = (string, search, replace) => {
        return string.split(search).join(replace);
    }
    
    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <ScrollView style={styles.SafeAreaView}>
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
                {isShowingDatePicker ? (
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
                                        onFocus={() => setShowingDatePicker(true)}
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
                )}

                {/* Time Start */}
                {isShowingTimeStartPicker ? (
                    <View style={styles.marginBottom1}>
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
                                <DatePicker
                                    style={{width:"70%", alignSelf: "center", borderWidth: 3, borderRadius: 10, borderColor: '#00AABB',}}
                                    current={getValues("time_start")}
                                    mode="time"
                                    onPress={TimeStartConsole}
                                />
                            )}
                        />
                        {errors?.date?.message && (
                            <Text style={styles.errorText}>{errors?.time_start?.message}</Text>
                        )}
                    </View>
                ) : (
                    <View style={styles.marginBottom1}>
                        <Pressable>
                            <Controller
                                name="time_start"
                                control={control}
                                rules={{
                                    required: { value: true, message: 'Start tijd is verplicht' },
                                    pattern: {
                                        value: DATE_REGEX,
                                        message: 'Start tijd is incorrect'
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <View>
                                        <CustomTextInput
                                            placeholder="Kies een start tijd"
                                            placeholderTextColor="#707070"
                                            onFocus={() => setShowingTimeStartPicker(true)}
                                            onChangeText={(text) => onChange(text)} 
                                            value={getValues("time_start")}
                                            errorText={errors?.time_start?.message}
                                            titleText="Start tijd"
                                        />
                                    </View>
                                )}
                            />
                        </Pressable>
                    </View>
                )}

                {/* Time end */}
                {isShowingTimeEndPicker ? (
                    <View style={styles.marginBottom1}>
                        <Controller
                            name="time_end"
                            control={control}
                            rules={{
                                required: { value: true, message: 'Eind tijd is verplicht' },
                                pattern: {
                                    value: DATE_REGEX,
                                    message: 'Eind tijd is incorrect'
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    style={{width:"70%", alignSelf: "center", borderWidth: 3, borderRadius: 10, borderColor: '#00AABB',}}
                                    current={getValues("time_end")}
                                    mode="time"
                                />
                            )}
                        />
                        {errors?.time_end?.message && (
                            <Text style={styles.errorText}>{errors?.time_end?.message}</Text>
                        )}
                    </View>
                ) : (
                    <View style={styles.marginBottom1}>
                        <Pressable>
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
                                    <View>
                                        <CustomTextInput
                                            placeholder="Kies een Eind tijd"
                                            placeholderTextColor="#707070"
                                            onFocus={() => setShowingTimeEndPicker(true)}
                                            onChangeText={(text) => onChange(text)} 
                                            value={getValues("time_end")}
                                            errorText={errors?.time_end?.message}
                                            titleText="Eind tijd"
                                        />
                                    </View>
                                )}
                            />
                        </Pressable>
                    </View>
                )}

                <View style={styles.marginBottom1}>
                    <CustomButton 
                        buttonType={"blueButton"}
                        text={"Bewerken"}
                        onPress={handleSubmit(updateData)}
                    />
                </View>

                <View>
                    <CustomButton 
                        buttonType={"redButton"}
                        text={"Verwijderen"}
                        onPress={handleSubmit(deleteData)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HourEditScreen;
  


