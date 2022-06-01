import React, { useEffect, useState } from 'react';
import Styles from './Styles';
import { SafeAreaView, FlatList } from 'react-native';
import Tile from '../../components/Tile/Tile';
import Header from '../../components/Header/Header';
import { useRoute } from "@react-navigation/native";

export default function ShowProjects(){

    const route = useRoute();
    const userId = route.params.userId;
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects(userId);
    }, []);

    const getProjects = (userId) => {
        fetch("http://localhost/PMA/PmaAPI/handlers/showProjects/showProjectsHandler.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            }),
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            setProjects(response);
        })
    }

    return (
        <SafeAreaView style={Styles.Container}>
            <Header GoToType="Add" GoTo="CreateProject" CenterGoTo="None" ReturnType="Home" />
            <FlatList
                numColumns={2}
                data={projects}
                keyExtractor={(project) => project.id}
                renderItem={({item}) =>
                    <Tile text={item.name} image="account-group" screen="ProjectScreen" projectId={item.project_id} userId={userId} />
                }
            />
        </SafeAreaView>
    )
}