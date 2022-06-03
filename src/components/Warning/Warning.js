import  { React, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';

function Warning(props) {
    const [name, setName] = useState("");

    useEffect(() => {
        getUsername(props.person);
    }, []);

    const getUsername = (userid) => {
        try {
            fetch("https://inf1b.serverict.nl/handlers/warning/warningUsernameFetch.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userid: userid,
            }),
            })
            .then((response) => response.text())
            // .then((response) => response.json())
            .then((response) => {
                console.log(JSON.parse(response));
                // ========================== Hier mag nog een functie komen voor het afhandelen van errors
                setName(JSON.parse(response));
            });
        } catch (error) {
            alert(error);
        }
    };

    return (
        <View>
            <View style={Styles.content}>
                <View style={Styles.iconContainer}>
                    <MaterialCommunityIcons name={"alert-circle"} size={70} color={"black"} />
                </View>

                <View style={Styles.textContainer}>
                    <Text style={Styles.nameText}>{name}</Text>
                    <Text style={Styles.reasonText}>Reden: {props.reason}</Text>
                </View>
            </View>
        </View>
    );
}

export default Warning;

const Styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "95%",
        minHeight: 100,
        padding: 10,
        margin: 8,
        borderWidth: 3,
        borderRadius: 20,
        borderColor: '#CB0005',
        backgroundColor:'#E62328',
    },
    iconContainer: {
        minWidth: "30%", 
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer : {
        minWidth: "70%",
        flexShrink: 1,
        color: "white",
        fontWeight: "bold",
    },
    nameText: {
        color: "white", 
        fontWeight: "bold", 
        textDecorationLine: 'underline', 
        fontSize: 20,
    }, 
    reasonText: {
        color: "white", 
        fontWeight: "bold",
    },
});