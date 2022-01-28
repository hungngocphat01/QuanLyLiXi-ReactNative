import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from "react";
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
const TitleBarContext = React.createContext({
  title: "Quản lý lì xì",
  setTitle: () => {}
});

export default function App() {
  const [headerTitle, setHeaderTitle] = useState("Quản lý lì xì");

  return (
    <Provider store={store}>
      <TitleBarContext.Provider value={{title: headerTitle, setTitle: setHeaderTitle}}>
        <NavigationContainer>
          <PaperProvider theme={theme}>
            <Stack.Navigator 
              initialRouteName="Home" 
              screenOptions={{header: props => <CustomNavBar {...props}/>}}
            >
              <Stack.Screen 
                name="Home" 
                component={HomeScreen}
              />
              <Stack.Screen 
                name="Report" 
                component={HomeScreen}
              />
              <Stack.Screen 
                name="Categories" 
                component={CategoriesScreen}
              />
              <Stack.Screen 
                name="Records" 
                component={RecordsScreen}
              />
            </Stack.Navigator>
          
            <Toast/>
          </PaperProvider>
        </NavigationContainer>
      </TitleBarContext.Provider>
    </Provider>
  );
}

function CustomNavBar(props) {
  const titleContext = useContext(TitleBarContext);

  return (
    <Appbar.Header>
      <TitleBarContext.Consumer>
        {({title, setTitle}) => <Appbar.Content title={title}/>}
      </TitleBarContext.Consumer>
    
      <Appbar.Action icon="home" onPress={() => {
        props.navigation.navigate("Home");
        titleContext.setTitle("Quản lý lì xì");
      }}/>
      <Appbar.Action icon="history" onPress={() => {
        props.navigation.navigate("Records");
        titleContext.setTitle("Lịch sử");
      }}/>
      <Appbar.Action icon="chart-areaspline"/>
      <Appbar.Action icon="shape" onPress={() => {
        props.navigation.navigate("Categories")
        titleContext.setTitle("Quản lý nhóm");
      }}/>
    </Appbar.Header>
  );
}