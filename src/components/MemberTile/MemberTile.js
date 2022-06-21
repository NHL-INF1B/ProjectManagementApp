import { React, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import allRoles from './countries.json';
import MemberInfo from '../../screens/MemberInfo/MemberInfo';
import { useNavigation, useRoute } from '@react-navigation/native';
import handlerPath from '../../../env';



function MemberTile(props) {
    const navigation = useNavigation();
    const [roles, setRoles] = useState([]);
    const [query, setQuery] = useState('');
    const [roleName, setRoleName] = useState('');
    const [dropdownButton, setDropdownButton] = useState('chevron-down');
    const [isVoorzitter, setIsVoorzitter] = useState(false);


    useEffect(() => {
        setRoles(allRoles);
        setRoleName(props.role);
        if (props.userRole == 'voorzitter') {
            setIsVoorzitter(true);
        }
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

    const capitalizeFirstLetter = (string) => {
        // return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateRole = (role, userId) => {

        try {
            fetch(handlerPath + "projectMembers/updateRole.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: role.id,
                    userId: userId
                }),
            })
                .then((response) => response.text())
                // .then((response) => response.json())
                .then((response) => {
                    alert('Rol is veranderd');
                });
        } catch (error) {
            alert(error);
        }
    }

    return (
        <View>
            <View style={Styles.content}>
                <View style={Styles.iconContainer}>
                    <MaterialCommunityIcons name={"account"} size={70} color={"black"} />
                </View>

                <View style={Styles.textContainer}>
                    <Text style={Styles.memberName}>{capitalizeFirstLetter(props.name)}</Text>

                    {isVoorzitter ? (
                        <View>
                            <TouchableOpacity
                                style={Styles.dropdown}
                                onPress={() => {
                                    onOpen('rollen' + props.id);
                                }}
                            >
                                <View style={Styles.dropdownText}>
                                    <Text>{capitalizeFirstLetter(roleName)}</Text>
                                </View>
                                <View style={Styles.dropdownArrow}>
                                    <MaterialCommunityIcons name={dropdownButton} size={20} color={"black"} />
                                </View>
                            </TouchableOpacity>

                            <Picker
                                label="Selecteer een nieuwe rol"
                                id={'rollen' + props.id}
                                data={filteredData}
                                inputValue={query}
                                searchable="true"
                                placeholderText="Zoeken naar rol"
                                closeText="Sluiten"
                                setSelected={data => { updateRole(data, props.id), setRoleName(data.name), console.log(data) }}
                            />
                        </View>
                    ) : (
                        <View>
                            <Text style={Styles.roleName}>{capitalizeFirstLetter(props.role)}</Text>
                        </View>
                    )}
                </View>

                <Pressable style={Styles.ArrowContainer} onPress={() =>
                    navigation.navigate('MemberInfo', {
                        id: props.id
                    })}>
                    <MaterialCommunityIcons name={"chevron-right"} size={50} color={"black"} />
                </Pressable>
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
        backgroundColor: 'white',
    },
    iconContainer: {
        minWidth: "30%",
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        minWidth: "50%",
        flexShrink: 1,
        color: "white",
        fontWeight: "bold",
    },
    ArrowContainer: {
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
    },
    memberName: {
        color: "#009BAA",
        fontWeight: 'bold',
        fontSize: 16,
    },
    roleName: {
        color: '#005AAA',
        fontWeight: 'bold',
        fontSize: 14,
    }
});
