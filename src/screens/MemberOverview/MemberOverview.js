import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { FlatList, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import MemberTile from "../../components/MemberTile/MemberTile";
import Header from '../../components/Header/Header';
import handlerPath from "../../../env";

const MemberOverview = ({ navigation }) => {
    const [member, setMembers] = useState([]);
    const [roleName, setRoleName] = useState('');

    const route = useRoute();
    const projectId = route.params.projectId;
    const userId = route.params.userId;

    useEffect(() => {
        getRole(userId, projectId);
    }, []);

    // Get the members of the project
    const getMembers = (userId, projectId) => {
        try {
            fetch(handlerPath + "projectMembers/fetchProjectMembers.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    projectId: projectId
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    setMembers(response);
                });
        } catch (error) {
            alert(error);
        }
    }

    // Get the current roles from the members of the project
    const getRole =  (userId, projectId) => {
        try {
            fetch(handlerPath + "projectMembers/fetchRole.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    setRoleName(response);
                    getMembers(userId, projectId);
                });
        } catch (error) {
            alert(error);
        }
    }

    var GoToType = "None";
    var GoTo = "None";

    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Header GoToType={GoToType} GoTo={GoTo} CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
            <FlatList
                data={member}
                keyExtractor={(member) => member.id.toString()}
                renderItem={({ item }) =>
                    <MemberTile
                        id={item.id}
                        name={item.name}
                        role={item.role}
                        userRole={roleName}
                    />
                }
            />
        </SafeAreaView>
    );
}

export default MemberOverview;
