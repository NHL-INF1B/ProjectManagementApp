import  { React, useEffect, useState } from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
// import Planning from '../../screens/Planning/Planning';

function PlanningTest(props) {
    const [planning, setPlanning] = useState("");

    useEffect(() => {
        getPlanningname(props.activiteit);
    }, []);

    const getPlanningname = (id) => {
        try {
            fetch("http://localhost:8080/PmaAPI/handlers/PlanningOverzicht/PlanningOverzichtHandler.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
            }),
            })
            .then((response) => response.text())
            // .then((response) => response.json())
            .then((response) => {
                console.log(JSON.parse(response));
                setPlanning(JSON.parse(response));
            });
        } catch (error) {
            alert(error);
        }
    };

    // var array = [];

    // firebase.firestore().collection('Something').where("text", "==" , "text").get().then((querySnapshot) =>{
    //     querySnapshot.forEach((doc) =>{
    //         arr.push(doc.data())
    //     })
    // })

    return (
        <View>
            <View style={Styles.content}>
                <View style={Styles.iconContainer}>
                    <MaterialCommunityIcons name={"alert-circle"} size={70} color={"black"} />
                </View>

                <View style={Styles.textContainer}>
                    <Text style={Styles.planningText}>{planning}</Text>
                    <Text style={Styles.weekText}>Planning week: {props.week}</Text>
                </View>
            </View>
        </View>
    );
}

export default PlanningTest;

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
    planningText: {
        color: "white", 
        fontWeight: "bold", 
        textDecorationLine: 'underline', 
        fontSize: 20,
    }, 
    weekText: {
        color: "white", 
        fontWeight: "bold",
    },
});