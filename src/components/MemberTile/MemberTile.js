import  { React, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
// import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import allRoles from './countries.json';



function MemberTile(props) {
    const [roles, setRoles] = useState([]);
    const [selected, setSelected] = useState(undefined);
    const [query, setQuery] = useState('');
    const [dropdownButton, setDropdownButton] = useState('chevron-down');


    useEffect(() => {
        setRoles(allRoles);
        // getUsername(props.person);
    }, []);

    const filteredData = useMemo(() => {
        if (roles && roles.length > 0) {
            return roles.filter((item) =>
                item.name
                    .toLocaleLowerCase('nl')
                    .includes(query.toLocaleLowerCase('nl'))
            );
        }
    }, [roles, query]);

    return (
        <View>
            <View style={Styles.content}>
                <View style={Styles.iconContainer}>
                    <MaterialCommunityIcons name={"account"} size={70} color={"black"} />
                </View>

                <View style={Styles.textContainer}>
                    <Text>USERNAME</Text>

                    <TouchableOpacity
                        style={Styles.dropdown}
                        onPress={() => {
                            onOpen('rollen' + props.id);
                        }}
                    >
                        <View style={Styles.dropdownText}>
                            <Text>ROLENAME</Text>
                        </View>
                        <View style={Styles.dropdownArrow}>
                            <MaterialCommunityIcons name={dropdownButton} size={20} color={"black"} />   
                        </View>
                    </TouchableOpacity>

                    <Picker
                        label="Selecteer een nieuwe rol"
                        id={'rollen' + props.id}
                        data={filteredData}
                        // inputValue={query}
                        setSelected={data => {setSelected(data)}}
                    />

                    <Text>Chosen : {JSON.stringify(selected)}</Text>
                </View>

                <View style={Styles.ArrowContainer}>
                    <MaterialCommunityIcons name={"chevron-right"} size={50} color={"black"} />
                </View>
            </View>

        </View>
    );
}

export default MemberTile;

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
        borderColor: '#009BAA',
        backgroundColor:'white',
    },
    iconContainer: {
        minWidth: "30%", 
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer : {
        minWidth: "50%",
        flexShrink: 1,
        color: "white",
        fontWeight: "bold",
    },
    ArrowContainer : {
        minWidth: "20%",
        flexShrink: 1,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
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
    dropdown: {
        marginTop: 5,
        marginBottom: 5,
        flex: 1,
        flexDirection: "row",
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#009BAA',
    },
    dropdownText: {
        minWidth: "75%",
        flexShrink: 1,
        color: "#009BAA",

    },
    dropdownArrow: {
        minWidth: "25%",
        flexShrink: 1,
        justifyContent: "center",
    }
});
