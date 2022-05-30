import { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import styles from './Styles';


const WarningScreen = () => {
    const [arr, setArr] = useState([]);

    useEffect(() => {
        readData();
	  }, []);

    const readData = () => {
        fetch('http://localhost/ReactNativeAPI/PmaAPI/handlers/warning/warninghandler.php', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
            })
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            setArr(response);
        })
    }

   
    
    return (
        <ScrollView style={styles.root}>

        </ScrollView>
    )
}
export default WarningScreen;