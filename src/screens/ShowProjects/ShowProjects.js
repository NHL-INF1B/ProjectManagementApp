import React, { useEffect, useState } from 'react';
import Styles from './Styles';
import { SafeAreaView, FlatList, ScrollView, View, Text } from 'react-native';
import Tile from '../../components/Tile/Tile';
import Header from '../../components/Header/Header';
import { useRoute, useIsFocused } from "@react-navigation/native";
import handlerPath from '../../../env';

export default function ShowProjects(){
    //declaring the const.
    const route = useRoute();
    const userId = route.params.userId;
    const projectId = route.params.projectId;
    const [projects, setProjects] = useState([]);
    const isFocused = useIsFocused();

    //get all the proejct when the page opens.
    useEffect(() => {
        getProjects(userId);
    }, [isFocused]);

    //get all the projects of a user.
    const getProjects = (userId) => {
        fetch(handlerPath + "showProjects/showProjectsHandler.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            })
        })
        .then((response) => response.json())
        .then((response) => {
            setProjects(response);
        })
    }

    //check if there is data to show.
    function checkData(projects){
        if(projects == "NO_DATA"){
            return(<Text style={Styles.nothingFound}>Je bent nog geen deel van een project.</Text>)
        } else{
            return(<FlatList
                numColumns={2}
                data={projects}
                keyExtractor={(project) => project.project_id}
                renderItem={({ item }) =>
                    <Tile 
                    text={item.name} 
                    image="account-group" 
                    screen="ProjectScreen" 
                    projectId={item.project_id} 
                    userId={userId} 
                    />
                }
            /> )
        }
    }

    return (
        <SafeAreaView style={Styles.Container}>
            <Header GoToType="Add" GoTo="CreateProject" CenterGoTo="None" ReturnType="Home" projectId={projectId} userId={userId} />
                
                {checkData(projects)}

        </SafeAreaView>
    )
}