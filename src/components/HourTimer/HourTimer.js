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

    // Asking for permission for the notification
    const [expoPushToken, setExpoPushToken] = useState('');
    
    // useEffect(() => {
    //     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    // }, []);

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
        storeData(data);
        alert("De timer is gestart");
    }

    const timerStop = (data) => {
        stopTimer(data);
        alert("De timer is gestopt");
        addPoints(userId, projectId);
    }

    // Add points when they add urenverantwoording
    const addPoints = (userId, projectId) => {
        try {
          fetch(handlerPath + "AddPoints/AddPoints.php", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
            userId: userId,
            projectId: projectId
            }),
          })
          .then((response) => response.json())
          .then((response) => {
          });
        } catch (error) {
          alert(error);
        }
      }

    // Saves the current timestamp & inserts it into the database as the start_time along with the other data via the handler file
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
                storeData(response.id);

            });
        } catch (error) {
            console.log(error);
        }
    };

    // Saves the current timestamp & updates it into the database as the end_time via the handler file
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
                catchFeedback(response);
                removeValue(); 
            });
        } catch (error) {
            console.log(error);
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
                //
                break;
          }
	};

    useEffect(() => {
    const data = getData();
    data.then((data) => {
        if (data !== undefined) {
            setId(data);
        }
        });    
    }, []);
     
    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("@timer_data");
          if (jsonValue !== null) {
            return JSON.parse(jsonValue);
          }
        } catch (e) {
          alert(e);
        }
    };
    
    const storeData = async (data) => {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem("@timer_data", jsonValue);
    } catch (e) {
        alert(e);
    }
    };
    
    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem("@timer_data");
        } catch (e) {
            console.log(e);
        }
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
                                value: 100,
                                message: 'Maximaal 100 tekens lang',
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

                <View style={styles.marginBottom5}>
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

// // Set the look of the notifications and set when it triggers
// async function schedulePushNotification() {
//     const identifier = await Notifications.scheduleNotificationAsync({
//         content: {
//             title: "Project Management App",
//             body: 'Vergeet je logboek vandaag niet in te vullen!',
//         },
//     trigger: { seconds: 60 * 24 },
//     });
//     return identifier;
//   }
  
// // Ask for permission to give notifications
// async function registerForPushNotificationsAsync() {
// let token;
// if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== 'granted') {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//     }

//     if (finalStatus !== 'granted') {
//         alert('Failed to get push token for push notification!');
//         return;
//     }

//     token = (await Notifications.getExpoPushTokenAsync()).data;
// } else {
//     alert('Must use physical device for Push Notifications');
// }

// if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//     name: 'default',
//     importance: Notifications.AndroidImportance.MAX,
//     vibrationPattern: [0, 250, 250, 250],
//     lightColor: '#FF231F7C',
//     });
// }

// return token;

// }

export default HourAddScreen;