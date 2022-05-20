import { useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../ProfilePage/Styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [discord, setDiscord] = useState("");

  return (
    <SafeAreaView style={Styles.SafeAreaView}>
      <View style={Styles.inputFields}>
        <Ionicons name="person" size={24} color="black" style={Styles.icon} />
        <Text style={Styles.input}>{name}</Text>
      </View>
      <View style={Styles.inputFields}>
        <MaterialCommunityIcons
          name="email"
          size={24}
          color="black"
          style={Styles.icon}
        />
        <Text style={Styles.input}>{email}</Text>
      </View>
      <View style={Styles.inputFields}>
        <MaterialCommunityIcons
          name="calendar"
          size={24}
          color="black"
          style={Styles.icon}
        />
        <Text style={Styles.input}>{dateOfBirth}</Text>
      </View>
      <View style={Styles.inputFields}>
        <MaterialCommunityIcons
          name="phone"
          size={24}
          color="black"
          style={Styles.icon}
        />
        <Text style={Styles.input}>{phoneNumber}</Text>
      </View>
      <View style={Styles.inputFields}>
        <MaterialCommunityIcons
          name="discord"
          size={24}
          color="black"
          style={Styles.icon}
        />
        <Text style={Styles.input}>{discord}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
