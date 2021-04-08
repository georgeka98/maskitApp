import React from "react";

import {StyleSheet , Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Button} from 'react-native';
import RegisterDefaults from "./registerStyle";
import AppButton from '../components/TouchButton';
import JoinNavLink from '../components/TouchButton copy';

import Defaults from "../constrains/Defaults";

import AsyncStorage from '@react-native-async-storage/async-storage';

const appId = "1047121222092614"

export default function Login({ navigation }) {

  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  const onRegisterPress = () => {
    navigation.navigate("Register");
  }

  const componentDidMount = () => {
  }

  const componentWillUnmount = () => {
  }

  const storeData = async () => {


    try {
      // setWelcomeScreen({"welcomeScreen": '1'})
      await AsyncStorage.setItem( 'auth', '1' );

    } catch (error) {
      // Error saving data
      alert(error)
    }

    return true;
  }

  const onLoginScreenPress = () => {
    navigation.navigate('Login');
  }

  const onForgotPasswordPress = () => {

  }

  // render() {
    return (
      <KeyboardAvoidingView style={RegisterDefaults.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={RegisterDefaults.JoinInView}>
            <View style={styles.loginForm}>
              <Text style={styles.info}>Great! Now you may return back to the Login Screen to enter your new password to log in!</Text>
            </View>

            <AppButton title="LOG IN" onPress={() => onLoginScreenPress()} btnStyle={[RegisterDefaults.btnSuccess]}  textStyle={[RegisterDefaults.btnText]} />
            <View style={RegisterDefaults.otherRegisterView}>
            <JoinNavLink onPress={() => onLoginScreenPress()} btnStyle={[RegisterDefaults.changeRegistrationBtn]} textStyle={RegisterDefaults.otherRegisterViewText} titleInfo={""} btnTitle={""} ></JoinNavLink>
            </View>
          </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  // }


  const onFbLoginPress = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }
}

const styles = StyleSheet.create({

  info:{
    fontSize: 18,
    fontFamily: Defaults.fontFamily
  },

  loginForm:{
    flex: 1,
    justifyContent: 'flex-start', //Centered vertically
    alignItems: 'center', // Centered horizontally
    flex:1
  },

  googleBtn: {
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  appleBtn: {
    backgroundColor: "#000",
    marginBottom: 16,
  },
  googleText: {
    color: "#000",
  },
  appleText: {
    color: "#fff",
  },
});
