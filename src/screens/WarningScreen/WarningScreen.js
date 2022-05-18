import { ScrollView, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './Styles';
import Bar from '../../components/Bar/bar';

const WarningScreen = () => {
    return (
        <ScrollView style={styles.root}>
            <View style={[styles.flex, styles.marginTop10]}>
                <MaterialCommunityIcons name="plus" size={60} color={'black'} />
                <MaterialCommunityIcons style={[styles.arrow]}  name="arrow-left" size={60} color={'black'} />
            </View>
            <Bar name={"alert-circle"} color={"black"} value={"Naam Test"}/>
            <Bar name={"alert-circle"} color={"black"}  style={styles.verticalMid}/>
            <Bar name={"alert-circle"} color={"black"}  style={styles.verticalMid}/>
            <Bar name={"alert-circle"} color={"black"}  style={styles.verticalMid}/>
            <Bar name={"alert-circle"} color={"black"}  style={styles.verticalMid}/>
            <Bar name={"alert-circle"} color={"black"}  style={styles.verticalMid}/>
            <Bar name={"alert-circle"} color={"black"}  style={styles.verticalMid}/>
            <Bar name={"alert-circle"} color={"black"}  style={styles.verticalMid}/>
            <Bar name={"alert-circle"} color={"black"}  style={styles.verticalMid}/>
            <Bar name={"alert-circle"} color={"black"}  style={styles.verticalMid}/>
        </ScrollView>
    )
}
export default WarningScreen;