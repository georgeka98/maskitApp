import React, { Component } from "react";

import styles from "./registerStyle";
import {Keyboard, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';

export default function Login({navigation}) {

  // render() {
    return (
      <KeyboardAvoidingView behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View >
          <Text >User</Text>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  // }
}
