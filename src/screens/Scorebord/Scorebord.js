import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { View, Text, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";


const Scorebord = ({ navigation, route }) => {

    const [projectMembers, setProjectMembers] = useState([]);
    const projectId = route.params.projectId;

    useEffect(() => {
        getScoreBordData(projectId);
	}, []);

    const getScoreBordData = (projectId) => {
        try {
			fetch("http://localhost/PMA/PmaAPI/handlers/scorebord/scorebord.php", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					projectId: projectId,
				}),
			})
            .then((response) => response.text())
            .then((response) => {
                console.log(response);
                setProjectMembers(response);
                
            });
		} catch (error) {
			alert(error);
		}
    }

    const Member = ({ title }) => (
        <View style={Styles.item}>
          <Text style={Styles.title}>{title}</Text>
        </View>
      );


    return (
        <SafeAreaView>
            {/* <FlatList
                data={projectMembers}
                keyExtractor={(projectMember) => projectMember.id.toString()}
                renderItem={({ item }) => 
                    <Member 
                        person={item.user_id} 
                        reason={item.reason} 
                    />
                }
            /> */}
        </SafeAreaView>

    );
}

export default Scorebord;