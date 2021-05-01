import React from "react";

import {StyleSheet, Keyboard, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Button, Text} from 'react-native';

import RegisterDefaults from "./registerStyle";
import AppButton from '../components/TouchButton';
import JoinNavLink from '../components/TouchButton copy';
import firebase from '../constrains/firebase';
import { storeData} from './helpers';

import AsyncStorage from '@react-native-async-storage/async-storage';

const appId = "1047121222092614"

export default function SignUpEmail({navigation}) {


  const [fullName, onChangeFullName] = React.useState(null);
  const [userName, onChangeUserName] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [confirmPassowrd, onChangeConfirmPassowrd] = React.useState(null);
  const [error, setError] = React.useState(null)

  const onLoginPress = () => {
    navigation.navigate('Login')
  }

  const onRegisterPress = () => {
  // .navigate('Home')

    if(password != confirmPassowrd){
      setError("Passowrd and Confirm Password fields do not match. Please ensure that you have typed the same password on both Passowrd and Confirm Password fields.");
      return
    }

    try{
      firebase.auth().createUserWithEmailAndPassword(email,password);
      // storeData();
      navigation.navigate('NavTabs');
    }
    catch(e){
      setError(e.message)
    }
  }


  const componentDidMount = () => {
  }

  const componentWillUnmount = () => {
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

  // render() {
    return (
      <KeyboardAvoidingView style={RegisterDefaults.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={RegisterDefaults.JoinInView}>


            <View style={RegisterDefaults.loginForm}>
              {/* <TextInput placeholder="Full Name" onChangeText={fullName => onChangeFullName(fullName)} value={fullName} placeholderColor="#c4c3cb" style={[RegisterDefaults.formTextInput, styles.input]} />
              <TextInput placeholder="Username" onChangeText={userName => onChangeUserName(userName)} value={userName} placeholderColor="#c4c3cb" style={[RegisterDefaults.formTextInput, styles.input]} secureTextEntry={true}/> */}
              <TextInput placeholder="Email" onChangeText={email => onChangeEmail(email)} value={email} placeholderColor="#c4c3cb" style={[RegisterDefaults.formTextInput, styles.input]} />
              <TextInput placeholder="Password" onChangeText={password => onChangePassword(password)} value={password} placeholderColor="#c4c3cb" style={[RegisterDefaults.formTextInput, styles.input]} secureTextEntry={true}/>
              <TextInput placeholder="Retype Password" onChangeText={confirmPassowrd => onChangeConfirmPassowrd(confirmPassowrd)} value={confirmPassowrd} placeholderColor="#c4c3cb" style={[RegisterDefaults.formTextInput, styles.input]} secureTextEntry={true}/>
            </View>

            {
            error ? <Text style={{color: "red"}}>{error}</Text> : null
          }

            <AppButton title="SIGN UP" onPress={() => onRegisterPress()} btnStyle={[RegisterDefaults.btnSuccess]}  textStyle={[RegisterDefaults.btnText]} />
            <View style={RegisterDefaults.otherRegisterView}>
                <JoinNavLink onPress={() => onLoginPress()} btnStyle={[RegisterDefaults.changeRegistrationBtn]} textStyle={RegisterDefaults.otherRegisterViewText} titleInfo={"Have an account?"} btnTitle={"Login here"} ></JoinNavLink>
              </View>
              <View style={RegisterDefaults.otherRegisterView}>
              <JoinNavLink onPress={() => navigation.navigate('Register')} btnStyle={[RegisterDefaults.changeRegistrationBtn]} textStyle={RegisterDefaults.otherRegisterViewText} titleInfo={"Back to "} btnTitle={"Main Menu"} ></JoinNavLink>
            </View>

          </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  // }
}

const styles = StyleSheet.create({

  input:{
    marginBottom: 30,
  },
});