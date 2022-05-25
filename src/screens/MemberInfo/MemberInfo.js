import { useState, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Circle from "../../components/Circle/Circle";
import ShowProfileInfo from "../../components/TextLatenZien/ShowProfileInfo";

const MemberInfo = () => {
  const [name, setName] = useState("-");
  const [email, setEmail] = useState("-");
  const [dateOfBirth, setDateOfBirth] = useState("-");
  const [phoneNumber, setPhoneNumber] = useState("-");
  const [discord, setDiscord] = useState("-");

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user_data");
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
        setName(data["name"]),
          setEmail(data["email"]),
          setDateOfBirth(data["dateOfBirth"]),
          setPhoneNumber(data["phoneNumber"]),
          setDiscord(data["discord"]);
      }
    });
  }, []);

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