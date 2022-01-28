import * as React from 'react';
import { 
	TextInput,
	Button
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

function TextComponent(props) {
	let text = null, setText = null;
	if (props.textStateManager == null) {
		[text, setText] = React.useState(props.defaultText);
	}
	else {
		[text, setText] = props.textStateManager;
	}
	return (
		<TextInput
			mode={props.mode}
			placeholder={props.placeholder}
			keyboardType={props.keyboardType}
			left={<TextInput.Icon name={props.icon}/>}
			value={text}
			onChangeText={text => setText(text)}
		/>
	);
}
	
function DropdownComponent(props) {
	let currentValue = null;
	let setValue = null;

	if (props.groupStateManager == null) {
		[currentValue, setValue] = React.useState("");
	} else {
		[currentValue, setValue] = props.groupStateManager;
	}

	const [dropVisibility, setVisibility] = React.useState(false);

	return (
		<DropDown
			placeholder={props.placeholder}
			mode={"flat"}
			visible={dropVisibility}
			showDropDown={() => setVisibility(true)}
			onDismiss={() => setVisibility(false)}
			value={currentValue}
			setValue={setValue}
			list={props.valueList}
		/>
	);
}

function ButtonComponent(props) {
	return (
		<Button style={props.style} icon={props.icon} mode="contained" onPress={props.onPress}>
			{props.text}
		</Button>
	)
}

export {
	TextComponent,
	DropdownComponent,
	ButtonComponent
};
