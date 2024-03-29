import  { React, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import handlerPath from '../../../env';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


function Warning(props) {
    //declaring the const.
    const navigation = useNavigation();
    const [name, setName] = useState("");

    //get the username when the page opens.
    useEffect(() => {
        getUsername(props.person);
    }, []);

    //get the username of the user.
    const getUsername = (userid) => {
        try {
            fetch(handlerPath + "warning/warningUsernameFetch.php", {
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
            .then((response) => {
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

                <View style={Styles.change}>
                    <Pressable
                        onPress={() => navigation.navigate("WarningEditScreen", {
                            userId: props.user_id,
                            projectId: props.projectId,
                            warningId: props.warningId,
                        })}
                    >   
                            <FontAwesome style={Styles.icon} name="pencil-square-o" size={24} color="black" />
                        </Pressable>
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
        minWidth: "60%",
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
    change: {
        minWidth: "10%", 
        alignItems: "center",
        justifyContent: "center",
    }
});