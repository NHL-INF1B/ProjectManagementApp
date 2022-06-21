import React, { useEffect, useState } from 'react';
import Styles from './Styles';
import { SafeAreaView, FlatList } from 'react-native';
import Tile from '../../components/Tile/Tile';
import Header from '../../components/Header/Header';
import { useRoute, useIsFocused } from "@react-navigation/native";
import handlerPath from '../../../env';

export default function ShowProjects(){

    const route = useRoute();
    const userId = route.params.userId;
    const projectId = route.params.projectId;
    const [projects, setProjects] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        getProjects(userId);
    }, [isFocused]);

    const getProjects = (userId) => {
        fetch(handlerPath + "showProjects/showProjectsHandler.php", {
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
            ;
            setProjects(response);
        })
    }

    return (
        <SafeAreaView style={Styles.Container}>
            <Header GoToType="Add" GoTo="CreateProject" CenterGoTo="None" ReturnType="Home" projectId={projectId} userId={userId} />
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