import React from "react";
import { StyleSheet, TouchableOpacity} from 'react-native';
import RegisterDefaults from "./registerStyle";
import AppButton from '../components/TouchButton';
import JoinNavLink from '../components/TouchButton copy';
import { storeData} from './helpers';

import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Button} from 'react-native';
// import { Button } from 'react-native-elements';

const appId = "1047121222092614"

export default function Register({navigation}) {

  const onEmailSignUpPress = () => {
    navigation.navigate('SignUpEmail');
  }


  const componentDidMount = () => {
  }

  const componentWillUnmount = () => {
  }

  const onLoginPress = () => {
    navigation.navigate('Login')
  }

  const noRegistration = () => {
    storeData();
    navigation.navigate('NavTabs');
  }

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

  const onAppleSignUpPress = async () => {
    return true;
  }

  const onGoogleSignUpPress = async () => {
    return true;
  }

  // render() {
    return (
      <KeyboardAvoidingView style={RegisterDefaults.containerView} 
      behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View 
          style={RegisterDefaults.JoinInView}
      > 
          <Text>Do I need an account?{"\n"}</Text>
          <Text>No you don't. Creating an account is not mandatory, but only to store your data in the cloud in case you are moving to a different device to still have access to your data. If you don't wish to create an account, you may choose "Continue without Account" but keep in mind that whatever you do will only be stored locally. You may always change your mind to create an account in the future, where all of your data will be automatically stored on the cloud.</Text>
          <AppButton title="Sign Up with Google" onPress={() => onGoogleSignUpPress()} btnStyle={[RegisterDefaults.btnDefault, styles.googleBtn]}  textStyle={[RegisterDefaults.btnText, styles.googleText]} />
          <AppButton title="Sign Up with Apple" onPress={() => onAppleSignUpPress()} btnStyle={[RegisterDefaults.btnDefault, styles.appleBtn]}  textStyle={[RegisterDefaults.btnText, styles.appleText]} />
          <AppButton title="Sign up with Email" onPress={() => onEmailSignUpPress()} btnStyle={[RegisterDefaults.btnDefault, {marginBottom: 16}]}  textStyle={[RegisterDefaults.btnText]} />
          <AppButton title="Continue without Account" onPress={() => noRegistration()} btnStyle={[RegisterDefaults.btnDefault]}  textStyle={[RegisterDefaults.btnText]} />
          
          <View style={RegisterDefaults.otherRegisterView}>
            <JoinNavLink onPress={() => onLoginPress()} btnStyle={[RegisterDefaults.changeRegistrationBtn]} textStyle={RegisterDefaults.otherRegisterViewText} titleInfo={"Already have an account?"} btnTitle={"Login here"} ></JoinNavLink>
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  // }
}

const styles = StyleSheet.create({
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

