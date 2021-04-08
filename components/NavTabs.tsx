import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavParamList } from './NavParamList';
import { StyleSheet, Text } from 'react-native';

import Defaults from "../constrains/Defaults";

import Ionicons from 'react-native-vector-icons/Ionicons';

import {AboutStackNavigator, SettingsStackNavigator, AddaskStackNavigator, HomeStackNavigator }  from '../components/StackNavigator';

const Tabs = createBottomTabNavigator<NavParamList>();

const NavTabs = () => {
  return (
    <Tabs.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused
            ? 'home-sharp'
            : 'home-outline';
        } else if (route.name === 'About') {
          iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'ios-settings' : 'ios-settings-outline';
        }

        // You can return any component that you like here!
        // return (
        //   <Text
        //     style={{
        //       fontFamily: fontStyle,
        //       fontSize: fontSize,
        //       color: fontColor,
        //     }}
        //   >
        //     {iconName}
        //   </Text>
        // );
        return <Ionicons name={iconName} size={size} color={"#fff"} style={styles.label} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: "#fff",
      inactiveTintColor: "#fff",
      style: styles.navbar,
    }}>
      <Tabs.Screen name="Home" component={HomeStackNavigator} />
      <Tabs.Screen name="About" component={AboutStackNavigator} />
      <Tabs.Screen name="Settings" component={SettingsStackNavigator} />
    </Tabs.Navigator>
  );
}

export default NavTabs;

const styles = StyleSheet.create({

  navbar:{
    backgroundColor: Defaults.pallete.main,
    paddingBottom: 10,
    paddingTop: 10,
    height: 70,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5.32,
    elevation: 8,
  },

  label:{
    fontWeight: "500",
    color: "#fff"
  }
});
