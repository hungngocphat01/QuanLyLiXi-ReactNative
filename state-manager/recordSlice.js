import { createSlice } from "@reduxjs/toolkit";
import Toast from 'react-native-toast-message';

export const recordSlice = createSlice({
  name: "records",
  initialState: [],
  reducers: {
    addNewRecord: addRecordCallback,
    deleteRecord: deleteRecordCallback
  }
});

function addRecordCallback(state, action) {
  // Every record is unique by CATEGORY and NAME
  const { name, money, note, category } = action.payload;
  if (name.length == 0 || money.length == 0 || category.length == 0) {
    console.log("Empty! Refusing");
    Toast.show({
      type: "error",
      text1: "Thông tin trống! Vui lòng kiểm tra lại.",
      position: "bottom"
    });
    return;
  }

  const idx = state.findIndex(elem => (elem["name"] == name) && (elem["category"] == category));

  if (idx == -1) {
    const newRecord = {
      name: name,
      money: Number.parseInt(money),
      note: note,
      category: category,
      date: (new Date()).toISOString()
    };
    state.push(newRecord);
    console.log(newRecord);

    Toast.show({
      type: "success",
      text1: `Đã thêm "${name}" (${category}) với ${money}đ`,
      position: "bottom"
    });
  } else {
    console.log("Object existed.");

    Toast.show({
      type: "info",
      text1: `"${name}" (${category}) đã tồn tại`,
      position: "bottom"
    });
  }
}

function deleteRecordCallback(state, action) {
  // Every record is unique by CATEGORY and NAME
  const { name, money, note, category } = action.payload;
  const idx = state.findIndex(elem => (elem["name"] == name) && (elem["category"] == category));

  if (idx > -1) {
    state.splice(idx, 1);
    console.log("Item deleted.");
    Toast.show({
      type: "success",
      text1: "Đã xóa thành công!",
      text2: `${name} (${category})`,
      position: "bottom"
    })
  } else {
    console.log("Record not found. Cannot delete.");
  }
}

export const { addNewRecord, deleteRecord } = recordSlice.actions;
export default recordSlice.reducer;