import React, { Component, useState, setState, useEffect } from "react";

import { SearchBar, Image } from 'react-native-elements';
import Defaults from "../constrains/Defaults";
import { welcomeBtnStyles } from '../styles/welcomeBtn';
import {Linking, StyleSheet, ScrollView, Keyboard, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, Modal, TouchableOpacity, Animated} from 'react-native';
import AppButton from '../components/TouchButton';
import {dateFormat, durationFormat} from './helpers';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function YourMasks({navigation}) {

  // render() {

    async function getNumberOfWeek(date) {
      let today = new Date(date)
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    const [ImpactWeek, setImpactWeekly] = React.useState({price: 0.0, weight: 0.0, usage: 0.0});
    const [ImpactTotal, setImpactTotal] = React.useState({price: 0.0, weight: 0.0, usage: 0.0});

    React.useEffect(() => {
    
      const getChosenMasks = async () => {
  
        let impactArr = await AsyncStorage.getItem("dailyImpact");
  
        if(impactArr != null){

          impactArr = JSON.parse(impactArr)

          let thisWeek = await getNumberOfWeek(parseInt(impactArr[impactArr.length -1].date)*1000);

          let totalObj = {price: 0.0, weight: 0.0, usage: 0.0};
          let thisWeekTotalObj = {price: 0.0, weight: 0.0, usage: 0.0};

          for(let i = impactArr.length - 1; i >= 0; i--)
          {
            let dayStats = impactArr[i];
            let week = await getNumberOfWeek(parseInt(dayStats.date)*1000);

            totalObj.price = totalObj.price + (dayStats.price || 0);
            totalObj.weight = totalObj.weight + (dayStats.weight || 0);
            totalObj.usage = totalObj.usage + (dayStats.usage || 0);

            if(week == thisWeek)
            {
              thisWeekTotalObj.price = thisWeekTotalObj.price + (dayStats.price || 0);
              thisWeekTotalObj.weight = thisWeekTotalObj.weight + (dayStats.weight || 0);
              thisWeekTotalObj.usage = thisWeekTotalObj.usage + (dayStats.usage || 0);
            }
          }

          console.log(impactArr)

          setImpactWeekly(thisWeekTotalObj);
          setImpactTotal(totalObj);
  
        }
      }
   
      getChosenMasks();
  
    }, [])

    return (
      <KeyboardAvoidingView behavior="padding">
  
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.homeVeiw} >
            <Text style={styles.label}>Your Impact this Week:</Text>
            <View style={[styles.window, styles.shadow]}>
              <Text >Costs</Text>
              <Text style={styles.value} >{ImpactWeek.price} $</Text>
              <Text >Total: {ImpactTotal.price} $</Text>
            </View>
            <View style={[styles.window, styles.shadow]}>
              <Text >Weight</Text>
              <Text style={styles.value} >{ImpactWeek.weight} gr.</Text>
              <Text >Total: {ImpactTotal.weight} gr.</Text>
            </View>
            <View style={[styles.window, styles.shadow]}>
              <Text >Usage</Text>
              <Text style={styles.value} >{durationFormat(ImpactWeek.usage)}</Text>
              <Text >Total: {durationFormat(ImpactTotal.usage)}</Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  // }
}

const styles = StyleSheet.create({
  homeVeiw:{
    padding: 30,
    position: "relative",
    padding: 30,
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

  value:{
    fontWeight: "700",
    fontSize: 38,
    marginTop: 12,
    marginBottom: 12,
  },

  window:{
    marginBottom: 22,
    borderRadius: 10,
    backgroundColor: "white",
    padding:22,
  },

  label:{
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 16,
  }
});