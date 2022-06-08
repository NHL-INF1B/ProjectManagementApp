import { ScrollView, View, SafeAreaView, Pressable, Text, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Circle from '../../components/Circle/Circle';
import Header from '../../components/Header/Header';
import { useForm, Controller } from "react-hook-form";
import CustomButton from '../../components/CustomButton/CustomButton';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  async function planNotification() {
    Notifications.getAllScheduledNotificationsAsync();
    await Notifications.cancelAllScheduledNotificationsAsync();
    await schedulePushNotification();
};

const HourAddScreen = () => {

    //notifactie toestemming vragen en alles
    const [expoPushToken, setExpoPushToken] = useState('');
    
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
}, []);


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
  
    const submitData = (data) => {
        planNotification();
        sendDataToAPI(data);
        alert("De gegevens zijn opgeslagen");
    };

    const timerStarter = (data) => {
        startTimer(data);
        alert("De timer is gestart");
    }

    const timerStop = (data) => {
        planNotification();
        stopTimer(data);
        alert("De timer is gestopt");
    }

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
                catchFeedback(response);
            });
        } catch (error) {
            alert(error);
        }
    };

    //Saves the current timestamp & inserts it into the database as the start_time along with the other data via the handler file
    const startTimer = (data) => {
        try {
            fetch("http://localhost/ReactNativeAPI/PmaAPI/handlers/houredit/houreditStartHandler.php", {
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
                catchFeedback(response);
            });
        } catch (error) {
            alert(error);
        }
    };

    //Saves the current timestamp & updates it into the database as the end_time via the handler file
    const stopTimer = (data) => {
        try {
            fetch("http://localhost/ReactNativeAPI/PmaAPI/handlers/houredit/houreditStopHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: data.id,
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

                <View style={styles.marginBottom5}>
                    <CustomButton 
                        buttonType={"blueButton"}
                        buttonText={"buttonText"}
                        text={"Toevoegen"}
                        onPress={handleSubmit(submitData)}
                    />
                </View>

                <View style={styles.marginBottom5}>
                    <Circle name={"timer"} size={60} color={"black"} text={"Timer"} />
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

//set how the notifications looks and when it goes off.
async function schedulePushNotification() {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Project Management App",
        body: 'Vergeet je logboek vandaag niet in te vullen!',
      },
      trigger: { seconds: 60 * 24 },
    });
    console.log(identifier);
    return identifier;
  }
  
  //ask for permission to give notifications
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

export default HourAddScreen;