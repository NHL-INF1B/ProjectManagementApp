import { Text, SafeAreaView, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useForm, Controller } from "react-hook-form";
import CustomButton from '../../components/CustomButton/CustomButton';
import { NavigationContainer } from '@react-navigation/native';


const HourEditScreen = ({navigation}) => {

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
    };
    
    const readData = (id) => {
        fetch('http://localhost/ReactNativeAPI/PmaAPI/handlers/houredit/houreditSelectHandler.php', {
            method: 'post',
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
            // console.log(response);
            setValue("title", response.title);
            setValue("description", response.description);
            setValue("date", response.date);
            setValue("time_start", response.time_start);
            setValue("time_end", response.time_end);
        })
    };

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
                // catchFeedback(response);
            });
        } catch (error) {
            alert(error);
        }
    };

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
                alert("De gegevens zijn succesvol verwijderd");
                navigation.navigate("HourAddScreen");
                // catchFeedback(response);
            });
        } catch (error) {
            alert(error);
        }
    };
    

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <View>
                <Circle name={"clipboard-text"} size={60} color={"#000000"} text={"Urenverantwoording\nBewerken"} />
            </View>

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
                            placeholder="Description" 
                            onChangeText={(text) => onChange(text)} 
                            value={value} 
                            errorText={errors?.description?.message} 
                            titleText="Description"
                        />
                    )}
                />
            </View>

            <View>
                <Controller
                    name="date"
                    control={control}
                    rules={{
                        required: { value: true, message: 'Datum is verplicht' },
                        maxLength: {
                            value: 50,
                            message: 'Maximaal 50 tekens lang',
                        }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <CustomTextInput 
                            placeholder="Datum" 
                            onChangeText={(text) => onChange(text)} 
                            value={value} 
                            errorText={errors?.date?.message} 
                            titleText="Datum"
                        />
                    )}
                />
            </View>

            <View style={styles.marginBottom1}>
                <Controller
                    name="time_start"
                    control={control}
                    rules={{
                        required: { value: true, message: 'Start tijd is verplicht' },
                        maxLength: {
                            value: 50,
                            message: 'Maximaal 50 tekens lang',
                        }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <CustomTextInput 
                            placeholder="Time_start" 
                            onChangeText={(text) => onChange(text)} 
                            value={value} 
                            errorText={errors?.time_start?.message} 
                            titleText="Time_start"
                        />
                    )}
                />
            </View>

            <View style={styles.marginBottom1}>
                <Controller
                    name="time_end"
                    control={control}
                    rules={{
                        required: { value: true, message: 'Stop tijd is verplicht' },
                        maxLength: {
                            value: 50,
                            message: 'Maximaal 50 tekens lang',
                        }
                    }}
                    render={({ field: { onChange, value } }) => (
                        // renderItem={({ item }) => 
                        <CustomTextInput 
                            data={data}
                            placeholder="Time_end" 
                            onChangeText={(text) => onChange(text)} 
                            value={value} 
                            errorText={errors?.time_end?.message} 
                            titleText="Time_end"
                        />
                    )}
                />
            </View>

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

            {/* <TouchableOpacity 
                style={[styles.button, styles.buttonGreen]} 
                onPress={() => startTimer(title, description, date, time_start)}
                activeOpacity={0.6}>
                <Text>START</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.button, styles.buttonRed]} 
                onPress={() => stopTimer(title, description, date, time_end)}
                activeOpacity={0.6}>
                <Text styles={styles.subtitle}>STOP</Text>
            </TouchableOpacity> */}
            
        </SafeAreaView>
    );
}

export default HourEditScreen;
  


