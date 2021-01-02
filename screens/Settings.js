import React, { Component } from "react";

import Defaults from "../constrains/Defaults";
import {StyleSheet, Keyboard, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Settings({navigation}) {

  // render() {
    return (
      <KeyboardAvoidingView behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.bg}>
        <View style={styles.homeVeiw} >
          <View style={styles.option}>
            <View>
              <Ionicons name="person-outline" color={"#000"} style={styles.optionIcon} />
            </View>
            <View style={styles.optionLabelCont}>
              <Text style={styles.optionLabel}>User Information</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward-outline" color={"#000"} style={styles.arrowIcon} />
            </View>
          </View>
          <View style={styles.option}>
            <View>
              <Ionicons name="notifications-outline" color={"#000"} style={styles.optionIcon} />
            </View>
            <View style={styles.optionLabelCont}>
              <Text style={styles.optionLabel}>Notification Settings</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward-outline" color={"#000"} style={styles.arrowIcon} />
            </View>
          </View>
          <View style={styles.option}>
            <View>
              <Ionicons name="lock-closed-outline" color={"#000"} style={styles.optionIcon} />
            </View>
            <View style={styles.optionLabelCont}>
              <Text style={styles.optionLabel}>Privacy &  Security</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward-outline" color={"#000"} style={styles.arrowIcon} />
            </View>
          </View>
          <View style={styles.option}>
            <View>
              <Ionicons name="help-circle-outline" color={"#000"} style={styles.optionIcon} />
            </View>
            <View style={styles.optionLabelCont}>
              <Text style={styles.optionLabel}>Help & Support</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward-outline" color={"#000"} style={styles.arrowIcon} />
            </View>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  // }
}

const styles = StyleSheet.create({
  
  homeVeiw:{
    padding: 30,
  },

  optionIcon:{
    marginRight: 15,
    fontSize: 32,
  },

  arrowIcon:{
    fontSize: 32,
  },

  option:{
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderColor: "#D6D6D6",
  },

  optionLabelCont:{
    flexGrow: 1,
  },

  optionLabel:{
    fontSize: 18,
    fontFamily: Defaults.text.fontFamily,
    fontWeight: "500",
    color: "#404040"
  }
  
});
