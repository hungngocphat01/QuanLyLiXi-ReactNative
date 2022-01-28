import React, { useContext, useState } from "react";
import { TextComponent, DropdownComponent, ButtonComponent } from "./UIComponents";
import {
  View, 
  Text, 
  Button, 
  StyleSheet,
  FlatList
} from 'react-native';

import {
  List,
  IconButton,
  FAB,
  Portal,
  Modal,
  Title
} from 'react-native-paper';

import { useDispatch, useSelector } from "react-redux";
import { addNewCategory, deleteCategory } from "../state-manager/categorySlice";
import Toast from 'react-native-toast-message';

export default function CategoriesScreen(props) {
  const [addModalVisibility, addModalSetState] = React.useState(false);

  const categoryList = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  console.log(categoryList);

  function ItemDeleteBtn(props) {
    return <IconButton icon="delete" onPress={() => {
      dispatch(deleteCategory(props.item));
      Toast.show({
        type: "success",
        text1: "Đã xóa thành công",
        text2: props.item,
        position: "bottom"
      });
    }}/>
  } 

  return (
    <View style={styles.mainViewStyle}>
      <FlatList
        data={categoryList}
        keyExtractor={item => item}
        renderItem={
          ({item}) => <List.Item 
            title={item} 
            right={
              props => <ItemDeleteBtn {...props} item={item}/>
            }
          />
        }
      />

      <FAB
        icon="plus"
        big
        style={styles.fabStyle}
        onPress={() => addModalSetState(true)}
      />

      <CategoryModal modalStateManager={[addModalVisibility, addModalSetState]}/>
    </View>
  );
}


function CategoryModal(props) {
  const [visible, setVisible] = props.modalStateManager;
  const [categoryState, categorySetState] = React.useState("");
  const dispatch = useDispatch();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Portal>
      <Modal
        visible={visible} 
        onDismiss={hideModal} 
        contentContainerStyle={containerStyle}
      >
        <Title>Thêm nhóm mới</Title>
        <TextComponent
          textStateManager={[categoryState, categorySetState]}
          placeholder="Nhập tên nhóm mới"
          mode="outlined"
        />
        
        <ButtonComponent
          icon="plus"
          text="Thêm"
          onPress={() => {
            dispatch(addNewCategory(categoryState));
            categorySetState("");
            hideModal();
            Toast.show({
              type: "success",
              text1: "Đã thêm thành công nhóm",
              text2: categoryState,
              position: "bottom"
            });
          }}
          style={{ marginTop: 10 }}
        />
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  fabStyle: {
    position: "absolute",
    margin: 30,
    right: 0,
    bottom: 0
  },
  mainViewStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  }
});