import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import CategoriesScreen from './components/CategoriesScreen';
import RecordsScreen from './components/RecordsScreen';

import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import store from './state-manager/store';

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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <PaperProvider theme={theme}>

        <Stack.Navigator initialRouteName="Home" screenOptions={{header: CustomNavBar}}>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Report" component={HomeScreen}/>
          <Stack.Screen name="Categories" component={CategoriesScreen}/>
          <Stack.Screen name="Records" component={RecordsScreen}/>
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
      <Appbar.Content title="Quản lý lì xì"/>
      <Appbar.Action icon="home" onPress={() => props.navigation.navigate("Home")}/>
      <Appbar.Action icon="history" onPress={() => props.navigation.navigate("Records")}/>
      <Appbar.Action icon="chart-areaspline"/>
      <Appbar.Action icon="shape" onPress={() => props.navigation.navigate("Categories")}/>
    </Appbar.Header>
  );
}