import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../ProfilePage/Styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Circle from "../../components/Circle/Circle";

const ProfilePage = () => {
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
      <View style={Styles.inputFields}>
        <Ionicons name="person" size={30} color="black" style={Styles.icon} />
        <Text style={Styles.input}>{name}</Text>
      </View>
      <View style={Styles.inputFields}>
        <MaterialCommunityIcons
          name="email"
          size={30}
          color="black"
          style={Styles.icon}
        />
        <Text style={Styles.input}>{email}</Text>
      </View>
      <View style={Styles.inputFields}>
        <MaterialCommunityIcons
          name="calendar"
          size={30}
          color="black"
          style={Styles.icon}
        />
        <Text style={Styles.input}>{dateOfBirth}</Text>
      </View>
      <View style={Styles.inputFields}>
        <MaterialCommunityIcons
          name="phone"
          size={30}
          color="black"
          style={Styles.icon}
        />
        <Text style={Styles.input}>{phoneNumber}</Text>
      </View>
      <View style={Styles.inputFields}>
        <MaterialCommunityIcons
          name="discord"
          size={30}
          color="black"
          style={Styles.icon}
        />
        <Text style={Styles.input}>{discord}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
