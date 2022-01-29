import * as React from 'react';
import { 
  TextInput,
  Button,
  Menu
} from "react-native-paper";

import {
  Text,
  Pressable,
  View,
} from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import strftime from "strftime";

function StatefulTextInput(props) {
  // EXCLUDE FOLLOWING KEYS:
  // icon, stateHandler

  const {icon, stateHandler, ...newProps} = props;
  const [state, setState] = stateHandler;

  return (
    <TextInput
      value={state}
      left={<TextInput.Icon name={icon}/>}
      onChangeText={text => setState(text)}
      {...newProps}
    />
  );
}
  
function StatefulMenuChooser(props) {
  const {icon, list, stateHandler, ...newProps} = props;
  const [menuVisible, menuVsbSetter] = React.useState(false);
  const [state, setState] = stateHandler;

  // Construct placeholder (shown and clickable from UI)
  function onPressEventHandler() {
    if (!list || list.length == 0) {
      alert("Danh sách rỗng.");
    } else {
      menuVsbSetter(true);
    }
  }

  const textBox = (
    <Pressable
      onPressIn={onPressEventHandler}>
      <TextInput
        value={state}
        left={<TextInput.Icon name={icon}/>}
        editable={false}
        {...newProps}
      />
    </Pressable>  
  );

  // Construct menu items
  const menuItems = [];
  for (const entry of list) {
    menuItems.push(
      <Menu.Item
        title={entry}
        onPress={() => {
          setState(entry);
          menuVsbSetter(false);
        }}
      />
    );
  }

  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => menuVsbSetter(false)}
      anchor={textBox}>
      {menuItems}
    </Menu>
  );
}

function ButtonComponent(props) {
  const {text, ...newProps} = props;

  return (
    <Button mode="contained" {...props}>
      {text}
    </Button>
  )
}

function DatePickerComponent(props) {
  const {icon, visbilityStateHandler, stateHandler, ...newProps} = props;

  const [modalVsblty, setModalVsblty] = visbilityStateHandler;
  const [value, setValue] = stateHandler;

  const textBox = (
    <Pressable
      onPress={(evt) => setModalVsblty(true)}>
      <TextInput
        left={<TextInput.Icon name={icon}/>}
        value={value}
        editable={false}
        {...newProps}
      />
    </Pressable>
  );

  // Construct date picker modal
  function handleConfirm(selectedDate) {
    console.log("Date selected");
    setValue(strftime("%d/%m/%Y", selectedDate));
    setModalVsblty(false);
  }

  const pickerModal = (
    <DateTimePickerModal
      isVisible={modalVsblty}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={() => {}}
    />
  );

  return (
    <View>
      {textBox}
      {pickerModal}  
    </View>
  );
}

export {
  StatefulTextInput,
  StatefulMenuChooser,
  ButtonComponent,
  DatePickerComponent
};
