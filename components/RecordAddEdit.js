import React, { useState, useContext } from "react";
import { 
  StatefulTextInput, 
  StatefulMenuChooser, 
  ButtonComponent,
  DatePickerComponent
} from "./UIComponents";

import { View } from 'react-native';
import strftime from "strftime";

import { useDispatch, useSelector } from "react-redux";
import { addNewRecord, deleteRecord } from '../state-manager/recordSlice';

function RecordAddEdit(props) {
  const dispatch = useDispatch();
  const categoryList = useSelector(state => state.categories);

  // Initialize default values for states
  let [moneyState, nameState, noteState, categoryState] = "";
  let dateState = strftime("%d/%m/%Y", new Date());

  if (props.editMode == true) {
    const { money, name, note, category, date } = props.recordInfo;
    [moneyState, nameState, noteState, categoryState, dateState] = [money, name, note, category, date];
  }

  const stateHandlers = {
    money: React.useState(moneyState),
    name: React.useState(nameState),
    note: React.useState(noteState),
    category: React.useState(categoryState),
    dateVisibility: React.useState(false),
    date: React.useState(dateState)
  }

  const getState = (state) => state[0];
  const setState = (state, value) => state[1](value);
  const deleteInputs = () => {
    setState(stateHandlers.money, "");
    setState(stateHandlers.name, "");
    setState(stateHandlers.note, "");
  };

  const addBtnEventHandler = () => {
    const newRecord = {
      name: getState(stateHandlers.name),
      money: getState(stateHandlers.money),
      note: getState(stateHandlers.note),
      category: getState(stateHandlers.category),
      date: getState(stateHandlers.date)
    };

    if (props.editMode == true) {
      dispatch(deleteRecord({
        name: nameState,
        category: categoryState
      }));
    }
    dispatch(addNewRecord(newRecord));
    deleteInputs();

    if (props.editMode == true) {
      props.setVisible(false);
    }
  };

  return (
    <View>
      <StatefulTextInput
        icon="account"
        keyboardType="default"
        placeholder="T??n"
        stateHandler={stateHandlers.name}
      />

      <StatefulTextInput
        icon="cash"
        keyboardType="numeric"
        placeholder="Gi?? tr???"
        stateHandler={stateHandlers.money}
      />

      <StatefulTextInput
        icon="text"
        keyboardType="default"
        placeholder="Ghi ch??"
        stateHandler={stateHandlers.note}
      />

      <StatefulMenuChooser
        placeholder="Nh??m"
        icon="account-multiple"
        stateHandler={stateHandlers.category}
        list={categoryList}
      />

      <DatePickerComponent
        placeholder="Ng??y"
        icon="calendar"
        stateHandler={stateHandlers.date}
        visbilityStateHandler={stateHandlers.dateVisibility}
      />

      <ButtonComponent
        mode="contained"
        icon={props.editMode ? "content-save" : "plus"}
        text={props.editMode ? "L??u" : "Th??m"}
        onPress={addBtnEventHandler}
      />

      {/* <ButtonComponent
        mode="contained"
        text="Show states"
        onPress={() => {
          for (const [key, value] of Object.entries(stateHandlers)) {
            console.log(key, "---", value[0]);
          }
          console.log("\n");
        }}
      /> */}

    </View>
  );
} 

export default RecordAddEdit;