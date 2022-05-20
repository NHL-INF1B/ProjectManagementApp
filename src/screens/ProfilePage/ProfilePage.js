import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../ProfilePage/Styles";

const ProfilePage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView style={Styles.SafeAreaView}>
      <View style={Styles.div}>
        <TextInput style={Styles.textinput} value={name} />
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
