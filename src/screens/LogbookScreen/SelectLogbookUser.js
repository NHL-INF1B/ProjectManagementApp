import React, { useEffect, useState } from 'react';
import Styles from './Styles';
import { Text, SafeAreaView, View } from 'react-native';
import { useRoute } from "@react-navigation/native";
import Circle from "./../../components/Circle/Circle";
import Header from '../../components/Header/Header';
import { FlatList } from 'react-native-gesture-handler';
import LogbookUser from '../../components/LogbookUser/LogbookUser';
import handlerPath from '../../../env';

export default function SelectLogbookUser(){
    //declaring the const and getting the userid and project id from the last page.
    const route = useRoute();
    const userId = route.params.userId;
    const projectId = route.params.projectId;
    const [user, setUser] = useState([]);

    //get the user when the page opens.
    useEffect(() => {
        getUser(projectId);
    }, []);

    //get the user
    const getUser = (projectId) => {
        fetch(handlerPath + "logbook/getLogbookUsersHandler.php", {
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
            setUser(response);
        })
    }

    return(
        <SafeAreaView style={Styles.SafeAreaView}>
            <Header GoToType="None" GoTo="None" CenterGoTo="None" ReturnType="Back" projectId={projectId} userId={userId} />
            <View style={Styles.marginBottom5}>
                <Circle name={"clipboard-text"} size={60} color={"#000000"} text={"Urenverantwoording\nInzien"} />
            </View>
            <Text style={Styles.subtitle}>Projectleden</Text>

            <FlatList
                data={user}
                keyExtractor={(user) => user.id}
                renderItem={({item}) =>
                    <LogbookUser projectId={projectId} userId={item.id} userName={item.name} />
            }
            />
        </SafeAreaView>
    )
}