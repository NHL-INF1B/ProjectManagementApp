import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { View, Text, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 
import Header from "../../components/Header/Header";
import handlerPath from "../../../env";


const Scorebord = ({ route }) => {

    const [projectMembers, setProjectMembers] = useState([]);
    const projectId = route.params.projectId;
    const userId = route.params.userId;

    useEffect(() => {
        getScoreBordData(projectId);
	}, []);

    const getScoreBordData = (projectId) => {
        try {
			fetch(handlerPath + "scorebord/scorebord.php", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					projectId: projectId,
				}),
			})
            .then((response) => response.json())
            .then((response) => {
                ;
                setProjectMembers(response);
                
            });
		} catch (error) {
			alert(error);
		}
    }

    const Item = ({ item }) => (
        <View style={Styles.miniContainer}>
            <View style={Styles.iconContainer}>
                <MaterialCommunityIcons name={"account"} size={80} color={"black"}/>
            </View>

            <View style={Styles.textContainer}>
                <View>
                    <Text style={Styles.name}>{item.name}</Text>
                </View>
                <View style={Styles.pointsContainer}>
                    <FontAwesome5 name="medal" size={24} color="black" />
                    <Text style={Styles.points}>{item.reward_points}</Text>
                </View>
            </View>
        </View>
      );

      const renderItem = ({ item }) => {
    
        return (
          <Item
            item={item}
          />
        );
      };


    return (
        <SafeAreaView style={Styles.SafeAreaView}>
            <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
                <FlatList
                    data={projectMembers}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
        </SafeAreaView>

    );
}

export default Scorebord;