import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Platform} from 'react-native';

export default function DropDown({ items, setItems, userId, roleId }){
    const [value, setValue] = useState(roleId);
    const [open, setOpen] = useState(false);
    let controller;
    console.log([value]);
    var zIndex = Number([userId]);
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
        //zIndex is nodig voor meerdere pickers, 
        //maar volgens mijn bronnen werkt zIndex juist niet met android (belangrijkste bron hieronder)
        //https://www.npmjs.com/package/rn-picker-dropdown#default-item
        //Uitlezen moet nog doorgestuurd naar de database, waarschijnlijk is daar een submit oid knop voor nodig op MemberScreen.
        zIndex={zIndex} //Dit levert dus (nog) problemen op op android
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
