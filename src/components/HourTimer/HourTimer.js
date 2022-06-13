import { ScrollView, View, SafeAreaView } from 'react-native';
import { React, useEffect, useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Circle from '../../components/Circle/Circle';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useRoute } from "@react-navigation/native";
import handlerPath from '../../../env';

const HourAddScreen = () => {

    const [id, setId] = useState("-");

    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            id: "",
            title_timer: "",
            description_timer: "",
        }
    });

    const timerStarter = (data) => {
        startTimer(data);
        alert("De timer is gestart");
    }

    const timerStop = (data) => {
        stopTimer(data);
        alert("De timer is gestopt");
    }

    //Saves the current timestamp & inserts it into the database as the start_time along with the other data via the handler file
    const startTimer = (data) => {
        try {
            fetch(handlerPath + "houredit/houreditStartHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: data.title_timer,
                    description: data.description_timer,
                    userId: userId,
                    projectId: projectId,
                }),
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setValue("id", response.id);
                setValue("title", response.title);
                setValue("description", response.description);
                setValue("date", response.date);
                setValue("time_start", response.time_start);
                setValue("time_end", response.time_end);
                setValue("userId", response.userId);
                setValue("projectId", response.projectId);
                setId(response.id);
                catchFeedback(response);

            });
        } catch (error) {
            alert(error);
        }
    };

    //Saves the current timestamp & updates it into the database as the end_time via the handler file
    const stopTimer = (data) => {
        try {
            fetch(handlerPath + "houredit/houreditStopHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    time_end: data.time_end,
                    userId: userId,
                    projectId: projectId,
                }),
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                catchFeedback(response);
                removeValue(); //If you want to remove the stored data
            });
        } catch (error) {
            alert(error);
        }
    };

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
            default:
                storeData(response[0]);
                console.log("De gegevens zijn opgeslagen");
                break;
          }
	};

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("timer_id");
            if (jsonValue !== null) {
                return JSON.parse(jsonValue);
            }
        } catch (e) {
            alert(e);
        }
    };

    useEffect(() => {
    const data = getData();
    data.then((data) => {
        if (data !== undefined) {
            console.log(data);
            setId(data["id"]);
        }
        });    
    }, []);
     
    const storeData = async () => {
        try {
            await AsyncStorage.setItem('timer_id', id)
        } catch (e) {
            console.log(e);
        }
    };
    
    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem("@timer_id");
        } catch (e) {
            alert(e);
        }
        console.log("Data has been removed");
    };

    const route = useRoute();
    const userId = route.params.userId;
    const projectId = route.params.projectId;

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <ScrollView style={styles.SafeAreaView}>
                <View style={styles.marginBottom5}>
                    <Circle name={"timer"} size={60} color={"black"} text={"Timer"} />
                </View>
                
                {/* Title */}
                <View style={styles.marginBottom1}>
                    <Controller
                        name="title_timer"
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
                                errorText={errors?.title_timer?.message} 
                                titleText="Activiteit"
                            />
                        )}
                    />
                </View>

                {/* Description */}
                <View style={styles.marginBottom1}>
                    <Controller
                        name="description_timer"
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
                                errorText={errors?.description_timer?.message} 
                                titleText="Beschrijving"
                            />
                        )}
                    />
                </View>

                <View style={styles.marginBottom1}>
                    <CustomButton 
                        buttonType={"greenButton"}
                        buttonText={"buttonText"}
                        text={"Start"}
                        onPress={handleSubmit(timerStarter)}
                    />
                </View>

                <View style={styles.marginBottom1}>
                    <CustomButton 
                        buttonType={"redButton"}
                        buttonText={"buttonText"}
                        text={"Stop"}
                        onPress={handleSubmit(timerStop)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HourAddScreen;