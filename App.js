import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from "react";

import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { enGB, registerTranslation } from 'react-native-paper-dates';

import store from './state-manager/store';

import HomeScreen from "./components/HomeScreen";
import CategoriesScreen from './components/CategoriesScreen';
import RecordsScreen from './components/RecordsScreen';
import ReportScreen from './components/ReportScreen';

import { 
  Appbar,
  Button, 
  DefaultTheme, 
  Provider as PaperProvider, 
  TextInput, 
  Title 
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'darkslategray',
  }
};

registerTranslation("en-GB", enGB);
const Stack = createNativeStackNavigator();


export default function App() {
  const [headerTitle, setHeaderTitle] = useState("Quản lý lì xì");

  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <Stack.Navigator 
            initialRouteName="Home" 
            screenOptions={{header: props => <CustomNavBar {...props}/>}}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ title: "Quản lý lì xì" }}
            />
            <Stack.Screen 
              name="Report" 
              component={ReportScreen}
              options={{ title: "Báo cáo" }}
            />
            <Stack.Screen 
              name="Categories" 
              component={CategoriesScreen}
              options={{ title: "Danh sách nhóm" }}
            />
            <Stack.Screen 
              name="Records" 
              component={RecordsScreen}
              options={{ title: "Lịch sử" }}
            />
          </Stack.Navigator>
        
          <Toast/>
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
}

function CustomNavBar(props) {
  return (
    <Appbar.Header>
      <Appbar.Content title={props.options.title}/>
    
      <Appbar.Action icon="home" onPress={() => {
        props.navigation.navigate("Home");
      }}/>
      <Appbar.Action icon="history" onPress={() => {
        props.navigation.navigate("Records");
      }}/>
      <Appbar.Action icon="chart-areaspline" onPress={() => {
        props.navigation.navigate("Report")
      }}/>
      <Appbar.Action icon="shape" onPress={() => {
        props.navigation.navigate("Categories")
      }}/>
    </Appbar.Header>
  );
}