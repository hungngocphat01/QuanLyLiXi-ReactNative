import React, { useState } from "react";
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
	Title,
	Caption,
	Subheading
} from 'react-native-paper';

import { useDispatch, useSelector } from "react-redux";
import Toast from 'react-native-toast-message';
import { addNewRecord, deleteRecord } from '../state-manager/recordSlice';
import strftime from 'strftime';
import RecordAddEdit from "./RecordAddEdit";


export default function RecordsScreen(props) {
	const [editModalVisibility, editModalSetState] = React.useState(false);
	const [selectedEntry, setSelectedEntry] = React.useState({});

	const recordList = useSelector((state) => state.records);
	const dispatch = useDispatch();

	function ItemDeleteBtn(props) {
		return <IconButton icon="delete" onPress={() => {
			dispatch(deleteRecord(props.item))
		}}/>
	} 

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
					<Text>{strftime("%d/%m/%Y", new Date(item.date))}</Text>
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

	return (
		<View style={styles.mainViewStyle}>
			<FlatList
				data={recordList}
				keyExtractor={item => (item.name, item.category)}
				renderItem={({item}) => <ListItem item={item}/>}
			/>

			<EditRecordModal
				selectedEntry={selectedEntry}
				modalStateManager={[editModalVisibility, editModalSetState]}
			/>
		</View>
	);
}


function EditRecordModal(props) {
	const [visible, setVisible] = props.modalStateManager;
	const [categoryState, categorySetState] = React.useState(true);
	const item = props.selectedEntry;
	const dispatch = useDispatch();

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const containerStyle = {backgroundColor: 'white', padding: 20};

	const predefinedState = {
		moneyState: item.money ? item.money.toString() : null,
		nameState: item.name,
		noteState: item.note,
		categoryState: item.category
	}

	return (
		<Portal>
			<Modal
				visible={visible} 
				onDismiss={hideModal} 
				contentContainerStyle={containerStyle}
			>
				<Title>Chỉnh sửa bản ghi</Title>
				<RecordAddEdit editMode={true} {...predefinedState}/>        
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
	},
	moneyTextStyle: {
		color: "green"
	}
});