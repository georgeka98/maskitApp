import React, { Component, useState, setState, useEffect } from "react";

import { SearchBar, Image } from 'react-native-elements';
import Defaults from "../constrains/Defaults";
import { welcomeBtnStyles } from '../styles/welcomeBtn';
import {Linking, StyleSheet, ScrollView, Keyboard, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, Modal, TouchableOpacity, Animated} from 'react-native';
import AppButton from '../components/TouchButton';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddMask({navigation}) {

  // render() {

    const masksWornHistory = () => {
      navigation.push('Masks Worn History')
    }

    const myImpact = () => {
      navigation.push('My impact')
    }

    return (
      <KeyboardAvoidingView behavior="padding">
  
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      {/* <View style={[styles.maskExpand]}>
                <View style={[styles.btnIcon ]}>
                  <Image source={{uri: maskExpand.image}} style={styles.imageStyle} />
                </View>
                <View style={[styles.btnInfo ]}>
                  <Text style={styles.btnInfoDescription}>{maskExpand.name}</Text>
                </View>
              </View> */}
        
        <ScrollView>
          <View style={styles.homeVeiw} >
          <TouchableWithoutFeedback onPress={()=> {masksWornHistory()}}>
          <View style={[styles.button, styles.shadow, styles.prevMask]}>
                <View style={[styles.btnIcon ]}>
                  <Image source={ require('../assets/mask-history.png') } style={styles.imageStyle} />
                </View>
                <View style={[styles.btnInfo]}>
                  <Text style={[styles.btnInfoHeader, {color: "white"}]}>Masks Worn</Text>
                </View>
              </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={()=> {myImpact()}}>
          <View style={[styles.button, styles.shadow, styles.prevMask]}>
                <View style={[styles.btnIcon ]}>
                  <Image source={ require('../assets/mask-white-blue-bg.png') } style={styles.imageStyle} />
                </View>
                <View style={[styles.btnInfo]}>
                  <Text style={[styles.btnInfoHeader, {color: "white"}]}>My Impact</Text>
                </View>
              </View>
          </TouchableWithoutFeedback>

          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  // }
}

const styles = StyleSheet.create({

  homeVeiw:{
    position: "relative",
    padding: 30,
  },
  button:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
    backgroundColor: 'rgba(91, 116, 249, 1.0)',
    borderRadius: 10,
    padding:10,
  },
  shadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.32,
    elevation: 3,
  },

  prevMask:{
    backgroundColor: "#52b4eb",
  },
  btnIcon:{
    paddingRight: 10
  },

  imageStyle:{
    height: 48,
    width: 48,
  },

  btnInfo:{
    flex: 1,
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
  },
  btnInfoHeader:{
    fontSize: 24,
    fontWeight: "500",
    fontFamily: "System",
    textAlign: "left",
    alignSelf: 'stretch',
  },

  search:{
    marginBottom: 22, 
    borderRadius: 10,
  }
});