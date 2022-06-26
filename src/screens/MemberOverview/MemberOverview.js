import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { Text, FlatList, SafeAreaView } from "react-native";
import { useRoute } from '@react-navigation/native';
import MemberTile from "../../components/MemberTile/MemberTile";
import Header from '../../components/Header/Header';
import handlerPath from "../../../env";

const MemberOverview = ({ navigation }) => {
    //declaring the const
    const [member, setMembers] = useState([]);
    const [roleName, setRoleName] = useState('');

    //get teh projectid and user id from the last page.
    const route = useRoute();
    const projectId = route.params.projectId;
    const userId = route.params.userId;

    //get the role of the user when the page opens.
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

    //check if there is any data to show the user.
    function checkData(members){
        if(members == "NO_DATA"){
            return(<Text style={Styles.nothingFound}>Er zijn nog geen andere projectleden in dit project.</Text>)
        }else{
            return(
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
                />)
        }
    }

    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Header GoToType={GoToType} GoTo={GoTo} CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
            <Text style={Styles.title}>Projectleden</Text>
            
            {checkData(member)}
        </SafeAreaView>
    );
}

export default MemberOverview;
