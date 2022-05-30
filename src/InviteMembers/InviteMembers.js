import React, { useCallback } from "react";
import { View, Text, Alert, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import CustomTextInput from "../components/CustomTextInput/CustomTextInput";
import Styles from "./styles";
import CustomButton from "../components/CustomButton/CustomButton";

const InviteMembers = () => {
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    Linking.openURL('mailto:'+ data.email +'?subject=Test&body=Hallo%0D%0ADit is een linkje naar de app');
  };

  return (
    <SafeAreaView style={Styles.SafeAreaView}>
      <View style={Styles.inputContainer}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: { value: true, message: "Email is verplicht" },
            pattern: {
              value: EMAIL_REGEX,
              message: "Email is niet correct",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              placeholder="Emailadres"
              placeholderTextColor="#707070"
              onChangeText={(text) => onChange(text)}
              value={value}
              errorText={errors?.email?.message}
              keyboardType="email-address"
              titleText="email"
            />
          )}
        />
      </View>
      <View>
        <CustomButton 
          buttonType={"blueButton"}
          text={"Versturen"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </SafeAreaView>
  );
};

export default InviteMembers;
