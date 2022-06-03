import React from 'react';
import { Text, View, SafeAreaView, SectionList } from 'react-native';
import { useEffect, useState } from 'react';
// import { FlatList } from 'react-native-gesture-handler';
// import PlanningComp from '../../components/PlanningComp/PlanningComp';
// import Planning from '../Planning/Planning';
import Styles from "./Styles";
import { set } from 'react-native-reanimated';
import Planning from '../Planning/Planning';

const PlanningOverzicht = ({ navigation }) => {
  // const [plannings, setPlannings] = useState([]);

  // useEffect(() => {
  //   readData(3, 1, 'PvA concept');
  // }, []);

  // const readData = (arr) => {
  //   fetch('http://localhost:8080/PmaAPI/handlers/PlanningOverzicht/PlanningOverzichtHandler.php', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       arr: arr,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     console.log(json);
  //     // .then((response) => {
  //       // return response;
  //       // console.log(response);
  //       // for (var i = 0; i < response.length; i++) {
  //       //   console.log(response[i][1]);

  //       //   for(var titel = 0; a < response[i][1]; titel++){
  //       //       console.log(response[i][1]);
  //       //   }    
  //       // }
  //       // console.log(response);
  //     // });
  // };

  const readData = async () => {
    const response = await fetch('http://localhost:8080/PmaAPI/handlers/PlanningOverzicht/PlanningOverzichtHandler.php');
    const json = await response.json();
    return json;
    
  }

  const renderItem = ({ week, data }) => {
    return ([
          { title: week, data: data },
        ]
    );
  };

  // const renderItem = input.reduce(( week, data)=> {
  //   let activiteitGroup = week.find(x => x.activiteit === data.activiteit);
  //   if(!activiteitGroup) {
  //     activiteitGroup = { activiteit: data.activiteit, activiteiten: [] }
  //     week.push(activiteitGroup);
  //   }
  //   dateGroup.transactions.push(data);
  //   return week;
  // }, []);
  // console.log(render)

  // ];
  // console.log(responseData);
  // for (let i = 0; i < responseData.length; i++) {
  //   // const element = array[i];


  // }

  // const DATA = [
  //     { responseData }
  // ]

  // const x = {readData};
  

  return (
    <SafeAreaView style={Styles.container}>
      <SectionList
        sections={[  
          {title: 'A', data: []},  
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