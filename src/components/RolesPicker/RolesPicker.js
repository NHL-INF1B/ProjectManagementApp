import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Platform} from 'react-native';

export default function DropDown({ items, setItems, projectId, userId, roleId }){
    const [value, setValue] = useState(roleId);
    const [open, setOpen] = useState(false);
    let controller;
    console.log([value]);
    var zIndex = userId;
    console.log(zIndex);

    return(
        <View
            style={{
                ...(Platform.OS !== 'android' && {
                    zIndex: {zIndex}
                })
            }}
        >
        <DropDownPicker
        style={{
            ...(Platform.OS !== 'android' && {
                zIndex: {zIndex}
            })
        }}
        // zIndex={zIndex}
        open={open}
        items={items}
        value={value}
        controller={instance => controller = instance}
        onChangeItem={(items, callback) => {
            new Promise((resolve, reject) => resolve(setItems(items)))
                .then(() => callback())
                .then(() => {});
        }}
        setOpen={setOpen}
        setItems={setItems}
        setValue={setValue}
        onSelectItem={item => setValue(item.value)}

        defaultValue={value}
        dropDownStyle={{}}
        />
        </View>
    )
}
