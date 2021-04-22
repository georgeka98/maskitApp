import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Defaults from "./constrains/Defaults";

import 'react-native-gesture-handler';

import Welcome from './screens/Welcome';
import Register from './screens/Register';
import Login from './screens/Login';
import SignUpEmail from './screens/SignUpEmail';
import ForgotPassword from './screens/ForgotPassword';
import ForgotPasswordEmailSent from './screens/ForgotPasswordEmailSent';

import NavTabs from './components/NavTabs';
import Layouts from './constrains/Layouts';

const { width, height } = Layouts.window;

export default function App() {
  
  console.disableYellowBox = true;

  const [welcomeScreen, setWelcomeScreen] = useState();
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false);

  const Stack = createStackNavigator();

  const load = async (key) => {
    try {
      let  value = await AsyncStorage.getItem( key);

      if(value !== null && key == 'welcomeScreen'){
        setWelcomeScreen(value);
      }
      if(value !== null && key == 'auth'){
        setAuth(value);
      }
    } catch (error) {
      alert(error)
    }
  }

  const remove = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
  }

  useEffect(() => {
    load('welcomeScreen')
    load('auth')
    // remove('welcomeScreen');
    // remove('auth');
  }, [])

  // const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();

  // if (!isLoadingComplete) {
  //   return null;
  // } else {

  if(loading){
    return (
      <>
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

    return (
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
        
          {auth ? 
            <NavTabs/>
            :
            <Stack.Navigator >
              {welcomeScreen == '1' ? (
                <Stack.Screen name="Register" component={Register}  />
                ) : (
                  <>
                <Stack.Screen name="Welcome" component={Welcome} options={{header: () => null}} />
                <Stack.Screen name="Register" component={Register}  options={{
                  headerLeft: () => null 
                }} />
                </>
                ) 
              }
              <Stack.Screen name="Login" component={Login}  options={{
                headerLeft: () => null,
                title: 'Login'
              }} />
              <Stack.Screen name="SignUpEmail" component={SignUpEmail}  options={{
                headerLeft: () => null,
                title: 'Sign Up'
              }} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword}  options={{
                headerLeft: () => null,
                title: 'Reset Passowrd'
              }} />
              <Stack.Screen name="ForgotPasswordEmailSent" component={ForgotPasswordEmailSent}  options={{
                headerLeft: () => null,
                title: 'Email Sent'
              }} />
              <Stack.Screen name="NavTabs" component={NavTabs} options={{header: () => null}} />
            </Stack.Navigator>
          }
        </SafeAreaView>

      </NavigationContainer>
    );
  // }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});