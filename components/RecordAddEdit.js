import React, { useState } from "react";
import { TextComponent, DropdownComponent, ButtonComponent } from "./UIComponents";

import { useDispatch, useSelector } from "react-redux";
import { addNewRecord, deleteRecord } from '../state-manager/recordSlice';


function RecordAddEdit(props) {
  const [moneyState, moneyStateSetter] = React.useState(props.moneyState ?? "");
  const [nameState, nameStateSetter] = React.useState(props.nameState ?? "");
  const [noteState, noteStateSetter] = React.useState(props.noteState ?? "");
  const [categoryState, categoryStateSetter] = React.useState(props.categoryState ?? "");

  const dispatch = useDispatch();
  const categoryList = useSelector(state => state.categories);

  const deleteInputs = () => {
    moneyStateSetter("");
    nameStateSetter("");
    noteStateSetter("");
  };

  return (
    <>
      <TextComponent 
        textStateManager={[nameState, nameStateSetter]}
        textStateChange={nameStateSetter}
        keyboardType="default"
        icon="account"
        placeholder="Nhập tên"
      />

      <TextComponent 
        textStateManager={[moneyState, moneyStateSetter]}
        keyboardType="numeric"
        icon="currency-usd"
        placeholder="Nhập số tiền"
      />

      <TextComponent 
        textStateManager={[noteState, noteStateSetter]}
        keyboardType="default"
        icon="text"
        placeholder="Ghi chú"
      />

      <DropdownComponent
        placeholder="Chọn nhóm"
        groupStateManager={[categoryState, categoryStateSetter]}
        valueList={categoryList.map(e => ({label: e, value: e}))}
      />

      <ButtonComponent
        text="Thêm"
        icon="plus"
        onPress={() => {
          const currentRecord = {
            name: nameState,
            money: moneyState,
            note: noteState,
            category: categoryState
          };

          if (props.editMode == true) {
            dispatch(deleteRecord(currentRecord));
          }
          dispatch(addNewRecord(currentRecord));
          deleteInputs();
        }}
      />
    </>
  );
} 

export default RecordAddEdit;