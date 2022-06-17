import { ScrollView, View, SafeAreaView } from 'react-native';
import React from 'react';
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Header from '../../components/Header/Header';
import Circle from '../../components/Circle/Circle';
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from '../../components/CustomButton/CustomButton';
import handlerPath from '../../../env';

const WarningAddScreen = ()  => {

    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            project_member: "",
            reason: "",
        }
    });

    const submitData = (data) => {
        sendDataToAPI(data);
        navigation.goBack();
        alert("De gegevens zijn opgeslagen");
    };


    //Inserting the data into the database
    const sendDataToAPI = (data) => {
        try {
            fetch(handlerPath + "warning/warningInsertHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reason: data.reason,
                    user_id: user_id,
                    project_id: project_id,
                }),
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setValue("reason", response.reason);
                setValue("user_id", response.user_id);
                setValue("project_id", response.project_id);
                catchFeedback(response);
            });
        } catch (error) {
            alert(error);
        }
    };

    const catchFeedback = (response) => {
        switch (response) {
            case "project_member_incorrect":
                alert("Het projectlid is incorrect");
                break;
            case "reason_incorrect":
                alert("De reden is incorrect");
                break;
            default:
                console.log("De gegevens zijn opgeslagen");
                break;
          }
	};

    const route = useRoute();
    const project_id = route.params.projectId;
    const user_id = route.params.userId;

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <ScrollView style={styles.SafeAreaView}>
                <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" />
                <View style={styles.marginBottom5}>
                    <Circle name={"alert-circle"} size={60} color={"#000000"} text={"Waarschuwing\nToevoegen"} />
                </View>

                {/* Project_member */}
                <View style={styles.marginBottom1}>
                    <Controller
                        name="project_member"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Projectlid is verplicht' },
                            maxLength: {
                                value: 50,
                                message: 'Maximaal 50 tekens lang',
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <CustomTextInput 
                                placeholder="Selecteer een projectlid" 
                                onChangeText={(text) => onChange(text)} 
                                value={value} 
                                errorText={errors?.project_member?.message} 
                                titleText="Projectlid"
                            />
                        )}
                    />
                </View>

                {/* Reason */}
                <View style={styles.marginBottom1}>
                    <Controller
                        name="reason"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Reden is verplicht' },
                            maxLength: {
                                value: 50,
                                message: 'Maximaal 50 tekens lang',
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <CustomTextInput 
                                placeholder="Reden" 
                                onChangeText={(text) => onChange(text)} 
                                value={value} 
                                errorText={errors?.reason?.message} 
                                titleText="Reden"
                            />
                        )}
                    />
                </View>

                <View style={styles.marginBottom5}>
                    <CustomButton 
                        buttonType={"redButton"}
                        buttonText={"buttonText"}
                        text={"Toekennen"}
                        onPress={handleSubmit(submitData)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default WarningAddScreen;
  


