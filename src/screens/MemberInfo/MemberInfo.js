import { useState, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Circle from "../../components/Circle/Circle";
import ShowProfileInfo from "../../components/ShowProfileInfo/ShowProfileInfo";

const MemberInfo = () => {
  //declaring the const where the info goes into.
  const memberId = 10; //temporary until the members page is made.
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

  //get the data when you go on the page
  useEffect(() => {
    // const data = getData();
    getMemberInfo(memberId);
  }, []);

  //get the info from the member which is chosen.
  const getMemberInfo = (memberId) => {
    try {
      fetch(
        "http://localhost/PMA/PmaAPI/handlers/memberInfoHandler/memberInfoHandler.php",
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
          // console.log(response);
          catchFeedback(response);
        });
    } catch (error) {
      alert(error);
    }
  };

  //catch the feeback from the API
  const catchFeedback = (response) => {
    console.log(response);

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

  //the screen
  return (
    <SafeAreaView style={Styles.SafeAreaView}>
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
