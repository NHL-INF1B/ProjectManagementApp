import { useState, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Circle from "../../components/Circle/Circle";
import ShowProfileInfo from "../../components/ShowProfileInfo/ShowProfileInfo";
import { useRoute } from "@react-navigation/native";
import handlerPath from "../../../env";
import Header from '../../components/Header/Header';

const MemberInfo = () => {
  // Declaring the const where the information will be stored
  const route = useRoute();
  const memberId = route.params.id;
  const [name, setName] = useState("-");
  const [email, setEmail] = useState("-");
  const [dateOfBirth, setDateOfBirth] = useState("-");
  const [phoneNumber, setPhoneNumber] = useState("-");
  const [discord, setDiscord] = useState("-");

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@member_data");
      if (jsonValue !== null) {
        return JSON.parse(jsonValue);
      }
    } catch (e) {
      alert(e);
    }
  };

  // Get the data when you go on the page
  useEffect(() => {
    getMemberInfo(memberId);
  }, []);

  // Get the info from the member which is selected
  const getMemberInfo = (memberId) => {
    try {
      fetch(
        handlerPath + "memberInfoHandler/memberInfoHandler.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memberId: memberId,
          }),
        }
      )
        .then((response) => response.json())
        .then((response) => {
          // ;
          catchFeedback(response);
        });
    } catch (error) {
      alert(error);
    }
  };

  // Catch the feeback from the API
  const catchFeedback = (response) => {
    ;

    switch (response[0]) {
      case "user_not_exists":
        alert("Deze gebruiker bestaat niet");
        break;
      default:
        setName(response.name);
        setEmail(response.email);
        setDateOfBirth(response.dateOfBirth);
        setPhoneNumber(response.phoneNumber);
        setDiscord(response.discord);
    }
  };

  var GoToType = "None";
  var GoTo = "None";

  return (
    <SafeAreaView style={Styles.SafeAreaView}>
      <Header GoToType={GoToType} GoTo={GoTo} CenterGoTo="None" ReturnType="Back" />
      <View style={Styles.person}>
        <Circle name="account" color="black" size={90} style={Styles.Circle} />
      </View>
      <ShowProfileInfo
        name={name}
        iconName="account"
        iconSize={30}
        iconColor="black"
      />
      <ShowProfileInfo
        name={email}
        iconName="email"
        iconSize={30}
        iconColor="black"
      />
      <ShowProfileInfo
        name={dateOfBirth}
        iconName="calendar"
        iconSize={30}
        iconColor="black"
      />
      <ShowProfileInfo
        name={phoneNumber}
        iconName="phone"
        iconSize={30}
        iconColor="black"
      />
      <ShowProfileInfo
        name={discord}
        iconName="discord"
        iconSize={30}
        iconColor="black"
      />
    </SafeAreaView>
  );
};

export default MemberInfo;
