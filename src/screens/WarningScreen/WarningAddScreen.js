import {
  ScrollView,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import styles from "./Styles";
import Header from "../../components/Header/Header";
import Circle from "../../components/Circle/Circle";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton/CustomButton";
import handlerPath from "../../../env";
import { Picker, onOpen } from "react-native-actions-sheet-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WarningAddScreen = () => {
  const route = useRoute();
  const project_id = route.params.projectId;
  const user_id = route.params.userId;

  const [query, setQuery] = useState("");
  const [members, setMembers] = useState([]); //List of members in the project
  const [selectedMember, setSelectedMember] = useState("Selecteer projectlid"); //Used for setting the title of dropdown

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      reason: "",
      userId: "",
    },
  });

  const filteredData = useMemo(() => {
    if (members && members.length > 0) {
      return members.filter((item) =>
        item.name
          .toLocaleLowerCase("nl")
          .includes(query.toLocaleLowerCase("nl"))
      );
    }
  }, [members, query]);

  const submitData = (data) => {
    sendDataToAPI(data);
    navigation.goBack();
    alert("De gegevens zijn opgeslagen");
  };

  const getMemberData = () => {
    try {
      fetch(handlerPath + "scorebord/scorebord.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project_id,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          setMembers(response);
        });
    } catch (error) {
      alert(error);
    }
  };

  // Inserting the data into the database
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
          user_id: data.userId,
          project_id: project_id,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
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
        //
        break;
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView style={styles.SafeAreaView}>
        <Header
          GoToType="None"
          GoTo="None"
          CenterGoTo="None"
          ReturnType="Back"
        />
        <View style={styles.marginBottom5}>
          <Circle
            name={"alert-circle"}
            size={60}
            color={"#000000"}
            text={"Waarschuwing\nToevoegen"}
          />
        </View>

        <View>
          <Controller
            name="userId"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Projectlid selecteren is verplicht",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => {
                    getMemberData();
                    onOpen("leden");
                  }}
                >
                  <View style={styles.dropdownText}>
                    <Text>{selectedMember}</Text>
                    <MaterialCommunityIcons
                      name={"chevron-down"}
                      size={20}
                      color={"black"}
                    />
                  </View>
                </TouchableOpacity>

                <Picker
                  label="Selecteer een projectlid"
                  id={"leden"}
                  data={filteredData}
                  inputValue={query}
                  searchable="true"
                  placeholderText="Zoek projectlid"
                  closeText="Sluiten"
                  setSelected={(data) => {
                    setValue("userId", data.id), setSelectedMember(data.name);
                  }}
                />

                <Text
                  style={{
                    alignSelf: "center",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {errors?.userId?.message}
                </Text>
              </View>
            )}
          />
        </View>

        {/* Reason */}
        <View style={styles.marginBottom1}>
          <Controller
            name="reason"
            control={control}
            rules={{
              required: { value: true, message: "Reden is verplicht" },
              maxLength: {
                value: 50,
                message: "Maximaal 50 tekens lang",
              },
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
};

export default WarningAddScreen;
