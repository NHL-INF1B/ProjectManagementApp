import React, { useEffect, useState } from 'react';
import Styles from './Styles';
import { Text, SafeAreaView, ScrollView, Image, FlatList } from 'react-native';
import Tile from '../../components/Tile/Tile';
import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ShowProjects(){

    // userId comes from welcome screen, temporary hardcode
    const userId = 2;
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