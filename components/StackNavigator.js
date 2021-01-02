import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Icon } from 'react-native-elements'

import Home from '../screens/Home';
import About from '../screens/About';
import Settings from '../screens/Settings';
import AddMask from '../screens/AddMask';
import User from '../screens/User';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#ffffff",
    // fontSize: 36,
    // fontWeight: "800",
    height: 60
  },
  headerTintColor: "black",
  headerBackTitle: "Back",
};

const HomeStackNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} options={{
        headerLeft: () => null,
        headerRight: () => <Icon 
                              reverse
                              name='user'
                              type='font-awesome'
                              color='#00000000'
                              onPress={() => {navigation.dispatch(CommonActions.navigate('User'))}}
                            />,
      }}></Stack.Screen>
      <Stack.Screen name="User" component={User} ></Stack.Screen>
    </Stack.Navigator>
  );
}

const AboutStackNavigator = () => {

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="About" component={About}
      options={{
        headerLeft: () => null,
      }}></Stack.Screen>
    </Stack.Navigator>
  );

}


const SettingsStackNavigator = () => {

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Settings" component={Settings}
      options={{
        headerLeft: () => null,
      }}></Stack.Screen>
    </Stack.Navigator>
  );

}


const AddaskStackNavigator = () => {

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Add Mask" component={AddMask}
      options={{
        headerLeft: () => null,
      }}></Stack.Screen>
    </Stack.Navigator>
  );

}

export {AboutStackNavigator, SettingsStackNavigator, AddaskStackNavigator, HomeStackNavigator } 