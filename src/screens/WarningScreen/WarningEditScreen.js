import { ScrollView, View, SafeAreaView, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import Header from '../../components/Header/Header';
import Circle from '../../components/Circle/Circle';
import { useRoute } from "@react-navigation/native";
import CustomButton from '../../components/CustomButton/CustomButton';
import handlerPath from '../../../env';

const WarningEditScreen = ({navigation}) => {
    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            name: "",
            reason: "",
        }
    });

    useEffect(() => {
        readData(warningId);
    }, []);

    const updateData = (data) => {
        editWarning(data);
        alert("De gegevens zijn succesvol aangepast");
        navigation.goBack();
    };

    const deleteData = (data) => {
        deleteWarning(data);
        alert("De gegevens zijn succesvol verwijderd");
        navigation.goBack();
    };
    
    // Selecting the data from the database based on id
    const readData = () => {
        fetch(handlerPath + 'warning/warningEditSelectHandler.php', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: warningId,
            })
        })
        .then((response) => response.json())
        .then((response) => {
            setValue("reason", response.reason);
            setValue("name", response.name); 
            catchFeedback(response);
        })
    };

    //Updating the data based on id
    const editWarning = (data) => {
        try {
            fetch(handlerPath + "warning/warningUpdateHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: warningId,
                    reason: data.reason,
                }),
            })
            .then((response) => response.json())
            .then((response) => {
                catchFeedback(response);
            });
        } catch (error) {
            alert(error);
        }
    };

     //Deleting a warning based on id
    const deleteWarning = () => {
        try {
            fetch(handlerPath + "warning/warningDeleteHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: warningId,
                }),
            })
            .then((response) => {
                catchFeedback(response);
            });
        } catch (error) {
            alert(error);
        }
    };

    const catchFeedback = (response) => {
        switch (response) {
            case "data_updated":
                alert("De gegevens zijn aangepast");
                break;
            case "data_deleted":
                alert("De gegevens zijn verwijderd");
                break;
            default:
              break;
          }
	};

    const route = useRoute();
    const user_id = route.params.userId;
    const warningId = route.params.warningId;
    const project_id = route.params.projectId;

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <ScrollView style={styles.SafeAreaView}>
                <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" />
                <View style={styles.marginBottom5}>
                    <Circle name={"alert-circle"} size={60} color={"#000000"} text={"Waarschuwing\nBewerken"} />
                </View>

                {/* Project_member */}
                <View style={styles.marginBottom1}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <CustomTextInput 
                                placeholder="Selecteer een projectlid"
                                onChangeText={(text) => onChange(text)} 
                                value={value} 
                                errorText={errors?.project_member?.message} 
                                titleText="Projectlid"
                                editable={false}
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
                            Alert.alert("Weet je zeker dat je deze waarschuwing wilt verwijderen?", "Er is geen mogelijkheid om dit terug te draaien!", [
                                { text: "Verwijderen", onPress: deleteData },
                                { text: "Annuleren" },
                            ])
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default WarningEditScreen;
  


