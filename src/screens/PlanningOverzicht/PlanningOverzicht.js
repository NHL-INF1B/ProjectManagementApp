import React from 'react';
import { Text, View, SafeAreaView, SectionList} from 'react-native';
import {useEffect, useState} from 'react';
// import { FlatList } from 'react-native-gesture-handler';
// import PlanningComp from '../../components/PlanningComp/PlanningComp';
// import Planning from '../Planning/Planning';
import Styles from "./Styles";
import { set } from 'react-native-reanimated';


    const PlanningOverzicht = ({ navigation }) => {
        const [plannings, setPlannings] = useState([]);
    
        useEffect(() => {
            readData(1); 
        }, []);
    
        const readData = (DBtest) => {
            fetch('http://localhost:8080/PmaAPI/handlers/PlanningOverzicht/PlanningOverzichtFetch.php', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // id: id,
                    // week: week,
                    // activiteit: activiteit,
                    // project_id: project_id,
                    DBtest: DBtest,

                })
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setPlannings(response);
            })
            // const plannings = Object.keys(DBtest).map(key => ({[key]: DBtest[key]}));
            // console.log(plannings);
        };

        // var myObject = JSON.parse(setPlannings);
        //     console.log(myObject);
        const obj = {id: "1", week: 1, activiteit: "PvA concept"};
        const myJSON = JSON.stringify(obj);

const week1 = [
  { id: 7, title: 'concept pva', week: 'week 1' },
  { id: 3, title: 'def pva', week: 'week 1' },
 
];

const week2 = [
  { id: 1, title: 'concept to', week: 'week 2' },
  { id: 4, title: 'def to', week: 'week 2' },
 
];

const response = [
   { id: 9, title: myJSON },
];

// const myObject = [
//     { 
       
//     },
//  ];

// const x = {readData};


// const result = DBtest.filter(word => word.includes("elite"));

// console.log(result);

// export default class App extends React.Component {
//   render() {
    return (
      <SafeAreaView style={Styles.container}>
        <SectionList
          sections={[
            { title: 'week 1', data: week1 },
            { title: 'week 2', data: week2 },
            { title: 'fetch test', data: response},
            // { title: 'fetch test 2', data: DBtest2},
          ]}
          renderItem={({ item }) => (
            <View style={Styles.row}>
              <Text>{item.title}</Text>
              <Text>{item.id}</Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={Styles.sectionHeader}>
              <Text>{section.title}</Text>
            </View>
          )}
          
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }

  export default PlanningOverzicht;