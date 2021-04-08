import React from "react";

import {StyleSheet , Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Button} from 'react-native';
import RegisterDefaults from "./registerStyle";
import AppButton from '../components/TouchButton';
import JoinNavLink from '../components/TouchButton copy';
import firebase from '../constrains/firebase';
import { storeData} from './helpers';

import AsyncStorage from '@react-native-async-storage/async-storage';

const appId = "1047121222092614";


export default function Login({ navigation }) {

  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();

  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [error, setError] = React.useState(null)

  const onRegisterPress = () => {
    navigation.navigate("Register");
  }

  const componentDidMount = () => {
  }

  const componentWillUnmount = () => {
  }

  const onLoginPress = () => {
  // .navigate('Home')

    try{
      const response = firebase.auth().signInWithEmailAndPassword(email,password);

      console.log(response)
      // storeData();

      // LOGIN

    }
    catch(e){
      setError(e.message);
      return
    }

    navigation.navigate('NavTabs');
  }

  const onForgotPasswordPress = () => {
    navigation.navigate("ForgotPassword");
  }

  // render() {
    return (
      <KeyboardAvoidingView style={RegisterDefaults.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={RegisterDefaults.JoinInView}>
            <View style={styles.loginForm}>
              <TextInput placeholder="Email" value={email} onChangeText={setEmail} placeholderColor="#c4c3cb" style={[RegisterDefaults.formTextInput, styles.input]} />
              <TextInput placeholder="Password" value={password} onChangeText={setPassword} placeholderColor="#c4c3cb" style={[RegisterDefaults.formTextInput, styles.input]} secureTextEntry={true}/>

              {
                error ? <Text style={{color: "red"}}>{error}</Text> : null
              }

              <View style={RegisterDefaults.otherRegisterView}>
                <JoinNavLink onPress={() => onForgotPasswordPress()} btnStyle={[RegisterDefaults.changeRegistrationBtn]} textStyle={RegisterDefaults.otherRegisterViewText} titleInfo={""} btnTitle={"Forgot your Password"} ></JoinNavLink>
              </View>
            </View>

            <AppButton title="LOG IN" onPress={() => onLoginPress()} btnStyle={[RegisterDefaults.btnSuccess]}  textStyle={[RegisterDefaults.btnText]} />
            <View style={RegisterDefaults.otherRegisterView}>
              <JoinNavLink onPress={() => onRegisterPress()} btnStyle={[RegisterDefaults.changeRegistrationBtn]} textStyle={RegisterDefaults.otherRegisterViewText} titleInfo={"Don’t have an account?"} btnTitle={"Register here"} ></JoinNavLink>
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

  input:{
    marginBottom: 30,
    height: 60
  },

  loginForm:{
    flex: 1,
    justifyContent: 'center', //Centered vertically
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
