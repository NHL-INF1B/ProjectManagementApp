import {React, useEffect, useState} from 'react';
import { View, SafeAreaView, SectionList, styles } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
import PlanningComp from '../../components/PlanningComp/PlanningComp';
// import Planning from '../Planning/Planning';
import Styles from "./Styles";


    const PlanningOverzicht = ({ navigation }) => {
        const [plannings, setPlannings] = useState([]);
    
        useEffect(() => {
            readData(1); // Hier moet de user komen die daadwerkelijk is meegestuurd
        }, []);
    
        const readData = (projectId) => {
            fetch('http://localhost:8080/PmaAPI/handlers/PlanningOverzicht/PlanningOverzichtHandler.php', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectId: projectId,
                })
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setPlannings(response);
            })
        };

        const sections = [
            {
              id: '0',
              title: 'Basic Components',
              data: [
                { id: '0', text: 'View' },
                { id: '1', text: 'Text' },
                { id: '2', text: 'Image' },
              ],
            },
            {
              id: '1',
              title: 'List Components',
              data: [
                { id: '3', text: 'ScrollView' },
                { id: '4', text: 'ListView' },
              ],
            },
          ]

     return (
    <SafeAreaView style={Styles.SafeAreaView}>
    <SectionList
      sections={plannings}
      renderItem={({ item }) => <Text style={Styles.row}>{item.text}</Text>}
      renderSectionHeader={({ section }) => (
        <Text style={Styles.header}>{section.title}</Text>
      )}
      keyExtractor={(PlanningComp) => PlanningComp.id.toString}    
        
    />
    </SafeAreaView>
    ) 
}

export default PlanningOverzicht;

   // return (
    // <SafeAreaView style={Styles.SafeAreaView}>
    // <SectionList
    // //   data ={plannings}
    //   sections={this.state.data}
    //   renderItem={({ item }) => 
    //         <PlanningComp
    //             activiteit={item.activiteit} 
    //             week={item.week}
    //         />
    //     }
    // />

    
//     <PlanningComp
//     activiteit={item.activiteit} 
//     week={item.week}
// />


        

        //     return (
        //       <View style={Styles.screen}>
            
        //         <SectionList
        //           sections={this.state.data}
        //           keyExtractor={(item, index) => item + index}
        //           renderItem={({ item }) => (
        //             <View style={Styles.row}>
        //               <Text style={Styles.rowText}>{item}</Text>
        //               <Icon name="ios-eye" type="ionicon" color="#C2185B" />
        //             </View>
        //           )}
        //           renderSectionHeader={({ section: { title } }) => (
        //             <Text style={Styles.header}>{title}</Text>
        //           )}
        //         />
        //       </View>
        //     );
        //   }

            //     <SafeAreaView style={Styles.SafeAreaView}>
    //        {<SectionList 
    //     data={plannings}
    //     keyExtractor={(PlanningComp) => PlanningComp.id.toString()}
    //     renderItem={({ item }) => 
    //         <PlanningComp
    //             activiteit={item.activiteit} 
    //             week={item.week}
    //         />
    //     }
    // /> }
    // </SafeAreaView>
    // );
    // }