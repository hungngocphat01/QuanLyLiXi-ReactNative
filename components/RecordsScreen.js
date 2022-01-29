import React, { useState } from "react";
import { StatefulTextInput, StatefulMenuChooser, ButtonComponent } from "./UIComponents";
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
  Title,
  Caption,
  Subheading
} from 'react-native-paper';

import { useDispatch, useSelector } from "react-redux";
import Toast from 'react-native-toast-message';
import { addNewRecord, deleteRecord } from '../state-manager/recordSlice';
import strftime from 'strftime';
import RecordAddEdit from "./RecordAddEdit";
import { ScrollView } from "react-native-web";


export default function RecordsScreen(props) {
  // Prepare states
  const [editModalVisibility, editModalSetState] = React.useState(false);
  const [selectedEntry, setSelectedEntry] = React.useState({});

  // Initialize redux related vars
  const recordList = useSelector((state) => state.records);
  const categoryList = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  // Trash icon to delete a record
  function ItemDeleteBtn(props) {
    return <IconButton icon="delete" onPress={() => {
      dispatch(deleteRecord(props.item))
    }}/>
  } 

  // Function to render a record
  function ListItem({item}) {
    return <List.Item
      title={
        props => <View>
          <Title>{item.name}</Title>
          <Caption>{item.category}</Caption>
        </View>
      }
      description={
        props => <View>
          <Subheading style={styles.moneyTextStyle}>{item.money} đ</Subheading>
          <Text>{item.date}</Text>
          {(item.note && item.note.length > 0) ? <Text>{item.note}</Text> : null}
        </View>
      }
      right={
        props => <ItemDeleteBtn {...props} item={item}/>
      }
      onPress={() => {
        setSelectedEntry(item);
        editModalSetState(true);
      }}
    />
  }

  // Group records by `category` field
  const groupByAccordions = [];
  for (const category of categoryList) {
    const categoryItems = recordList.filter(e => e.category == category);

    if (categoryItems.length > 0) {
      groupByAccordions.push(
        <List.Accordion title={category} style={{ backgroundColor: "silver" }}>
          <FlatList
            data={categoryItems}
            keyExtractor={item => item.name + item.category}
            renderItem={({item}) => <ListItem item={item}/>}
          />
        </List.Accordion>
      )
    }
  }

  // Main view's content
  const flexBoxChildren = [
    <FlatList
      data={groupByAccordions}
      renderItem={({item}) => item}
      keyExtractor={(accordion) => accordion.props.title}
    />,
    <EditRecordModal
      selectedEntry={selectedEntry}
      modalStateManager={[editModalVisibility, editModalSetState]}
    />
  ];

  return (
    <View style={styles.mainViewStyle}>
      {flexBoxChildren}
    </View>
  );
}


function EditRecordModal(props) {
  // Initialize states
  const [visible, setVisible] = props.modalStateManager;
  const [categoryState, categorySetState] = React.useState(true);
  const item = props.selectedEntry;
  const dispatch = useDispatch();

  // Function to show and hide modals
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  // Retrieve info from selected entry
  const predefinedState = {
    money: item.money ? item.money.toString() : null,
    name: item.name,
    note: item.note,
    category: item.category,
    date: item.date
  }

  return (
    <Portal>
      <Modal
        visible={visible} 
        onDismiss={hideModal} 
        contentContainerStyle={containerStyle}
      >
        <Title>Chỉnh sửa bản ghi</Title>
        <RecordAddEdit editMode={true} setVisible={setVisible} recordInfo={predefinedState}/>        
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
    justifyContent: "flex-start",
  },
  moneyTextStyle: {
    color: "green"
  }
});