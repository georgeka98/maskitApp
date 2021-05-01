import React, { useEffect, state, setState, updateState, Component } from "react";

import {StyleSheet, Keyboard, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, Image, ScrollView, Alert, Button} from 'react-native';
import Defaults from "../constrains/Defaults";
import AddMask from './AddMask';
// import {useNetInfo} from "@react-native-community/netinfo";

import Constants from 'expo-constants';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import { firestore } from "firebase";
import firebase from 'firebase';
import 'firebase/firestore';

// import styled from 'styled-components';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default class Home extends Component {


  constructor(props){
    super(props);
    this.state= {
      maskWearingColors: ["#3ED47D", "#EFCC74", "#EF7474"],
      maskWearingMesseges: ["Not Wearing Mask", "Wearing Mask", "Remove Soon", "Mask Overtime"],
      notifications: [["Recommended time almost over", 'Your mask is recommended to be removed within 30 minutes if possible.'],["Recommended time over", 'Your mask is recommended to be disposed or cleaned and switched to a new one within 1 minute if possible.']],
      // netInfo: useNetInfo(),
      notificationListener: React.createRef(),
      responseListener: React.createRef(),
      expoPushToken: "",
      notification: false,
      notificationsSent: [false,false],
      intervalRef: null,
      maskUsing: null,
      maskUseBegun: null,
      wearingMaskColor: 0,
      wearingMaskLabel: 0,
      wearingMaskTimeLeft: 0,
    }
  }


  // 0 = green - not wearing mask
  // 1 = orange - wearing mask
  // 2 = red - mask overdue/soon to remove
  
  timer = () => {

      const {maskUsing, maskUseBegun, notificationsSent, notifications} = this.state;

      let timeNow = String(parseInt(Date.now()/1000)); // current time in seconds
    
      if(maskUsing === null && maskUseBegun === null)
      {
        this.setState({wearingMaskColor:0, wearingMaskLabel: 0, wearingMaskTimeLeft: 0})
      }
      else
      {
        if(maskUsing.maxWearTime - (timeNow - maskUseBegun) < 0){ // mask expired
          this.setState({wearingMaskColor:2, wearingMaskLabel: 3, wearingMaskTimeLeft: maskUsing.maxWearTime - (timeNow - maskUseBegun)})

          if(maskUsing.maxWearTime - (timeNow - maskUseBegun) > -2){
            if(!notificationsSent[1]){
              this.schedulePushNotification(notifications[1][0],notifications[1][1]);
              this.setState({notifications:[true,true]})
            }
          }
        }
        else{
          if(maskUsing.maxWearTime - (timeNow - maskUseBegun) < 1800){ // 30 minutes left till mask wears out

            this.setState({wearingMaskColor:2, wearingMaskLabel: 2, wearingMaskTimeLeft: maskUsing.maxWearTime - (timeNow - maskUseBegun)})

            if(maskUsing.maxWearTime - (timeNow - maskUseBegun) > 1798){
              if(!notificationsSent[0]){
                this.schedulePushNotification(notifications[0][0],notifications[0][1]);
                this.setState({notifications:[true,false]})
              }
            }
          }
          else{
            this.setState({wearingMaskColor:1, wearingMaskLabel: 1, wearingMaskTimeLeft: maskUsing.maxWearTime - (timeNow - maskUseBegun)})
          }
        }
      }

    // return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }

  // execute only when maskUsing and maskUseBegun have been changed
  // useEffect(() => {
  //   if (maskUsing !=  null && maskUseBegun != null) {
  //     updateMessage(maskUsing, maskUseBegun)
  //     timer();
  //   }
  // }, [maskUsing, maskUseBegun]);

  // notifications 
  async componentDidMount() {

    const {notificationListener, responseListener, maskWearingMesseges} = this.state

    this.registerForPushNotificationsAsync().then(token => this.setState({expoPushToken: token}));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      this.setState({notification:notification})
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      
    });

    this.intervalId = setInterval(this.timer.bind(this), 1000);
    this.getChosenMasks()

    // check if tutorial is done

    try{
      let tutorial = await AsyncStorage.getItem("tutorialDone");
      if(tutorial == undefined || tutorial == null){
        // do totu
        Alert.alert(
          "Welcome & How to Use",
          "Thank you for downloading maskit. Here is a set of instructions on how to use the app. \n\n1. Tap on \"Select Masks\" to choose masks to wear and get a link to the purchase page (UK only for now).\n\n2. Once you purchase the mask, add it.\n\n3. Go back and tap on \"Your Masks\" to find the mask you have just added (assuming you have purchased it).\n\n4. Tap on your mask and tap on \"Wear\". MaskIt assumes you are wearing a mask now.\n\n5. Tap on \"Remove Mask\" to remove the mask.\n\n6. Tap on \"Events\" to create an event and to let MaskIt know when to remind you to wear your mask.\n\nKeep in mind the app has a recommended continuous period of wearing a mask of 6 hours. If you are still out for more than 6 hours, we encourage you to NOT throw your mask away, until you get back home.\n",
          [
            {
              text: "Thank you",
              onPress: () => Alert.alert("To review the instructions again, scroll all the way to the bottom. \n\nThank you once again for choosing us!"),
              style: "cancel",
            },
          ],
          {
            cancelable: true,
            onDismiss: () =>
              Alert.alert(
                "This alert was dismissed by tapping outside of the alert dialog."
              ),
          }
        )
        AsyncStorage.setItem("tutorialDone", "1");
      }
    }
    catch(e){
      console.log(e)
    }

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }

  getChosenMasks = async () => {

    let maskUsingCheck = await AsyncStorage.getItem("currentMaskUsing");
    let maskUseBegunCheck = await AsyncStorage.getItem("wearStarted");

    if(maskUsingCheck != null && maskUseBegunCheck != null){

      this.setState({maskUsing:JSON.parse(maskUsingCheck), maskUseBegun: parseInt(maskUseBegunCheck)}, () => {this.timer.bind(this)})

    }
    this.downloadFromFirebase();

  this.downloadFromFirebase();

};

  schedulePushNotification = async (title, desc) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: desc,
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }
  
  registerForPushNotificationsAsync = async () => {

    let token;
    
    if (Constants.isDevice) 
    {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  downloadFromFirebase = async () => {
    let masksFormatted = [];

    await firebase
      .firestore()
      .collection("masksample")
      .get()
      .then(async (querySnapshot) => {
 
        await querySnapshot.forEach(async (doc) => {

          var storage = await firebase.storage().ref();
          let imgPath = "mask-sample-images/mask_" + doc.id + ".jpg";
 
          await storage
            .child(imgPath)
            .getDownloadURL()
            .then((url) => {
              // `url` is the download URL for 'images/stars.jpg'

              let obj = doc.data()
              obj.image = url
              obj.id = doc.id;

              // console.log(obj)

              masksFormatted.push(obj);

              // This can be downloaded directly:
              var xhr = new XMLHttpRequest();
              xhr.responseType = "blob";
              xhr.onload = (event) => {
                var blob = xhr.response;
              };
              xhr.open("GET", url);
              xhr.send();
 

              // Or inserted into an <img> element
              // var img = document.getElementById('myimg');
              // img.setAttribute('src', url);
            })
            .catch((error) => {
              // Handle any errors
            });
        });
      });

  };


  timeLeftFormat = () => {

    const {wearingMaskTimeLeft} = this.state;

    let hours = Math.floor(wearingMaskTimeLeft / 3600);
    let minutes = Math.floor(wearingMaskTimeLeft / 60) % 60;
    let seconds = wearingMaskTimeLeft % 60;

    return hours+"h "+minutes+"m "+seconds+"s";
  }

  wearOrRemoveMask = async () => {
    
    try{

      this.setState({notificationsSent: [false,false]});

      const {maskWearingMesseges, maskUsing, maskUseBegun} = this.state;

      let timeNow = String(parseInt(Date.now()/1000)); // current time in seconds

      if(maskUsing !== null && maskUseBegun !== null){

        let duration = timeNow - maskUseBegun;
  
        AsyncStorage.removeItem("currentMaskUsing");
        AsyncStorage.removeItem("wearStarted");

        // reset to no wearing mask

        this.setState({maskUsing: null, maskUseBegun: null, wearingMaskColor: 0, wearingMaskLabel: 0, wearingMaskTimeLeft: 0}, () => { clearInterval(this.intervalId) }); 
        clearInterval(this.intervalId);

        if(duration > 30 * 60) // mnask worn for longer than 30 minutes straight
        {
          // mask history object
          let maskWornDetailsObj = {
            maskID: maskUsing.id,
            duration: duration,
            maskWornDate: maskUseBegun,
            maskRemovedDate: timeNow,
          }
  
          // store mask used to history mask usage
          let masksWornHistory = await AsyncStorage.getItem("masksWornHistory");

  
          if(masksWornHistory === null)
          {
            AsyncStorage.setItem("masksWornHistory", JSON.stringify([maskWornDetailsObj]));
          }
          else{
            masksWornHistory = JSON.parse(masksWornHistory);
            masksWornHistory.push(maskWornDetailsObj)
  
            AsyncStorage.setItem("masksWornHistory", JSON.stringify(masksWornHistory));
          }

          // update impact
          let impact = await AsyncStorage.getItem("dailyImpact");

          if(impact === null)
          {
            let impactObj = {
              price: maskUsing.price,
              weight: maskUsing.weight,
              usage: duration,
              date: timeNow
            }

            AsyncStorage.setItem("dailyImpact", JSON.stringify([impactObj]));
          }
          else{
            let impactArr = JSON.parse(impact);

            let currentDate = new Date(timeNow*1000);
            let currentDay = currentDate.getDay()

            let lastUpdated = new Date(impactArr[impactArr.length-1].date*1000);
            let lastUpdatedDay = lastUpdated.getDay()

            if(lastUpdatedDay != currentDay)
            {
              let impactObj = {
                price: maskUsing.price,
                weight: maskUsing.weight,
                usage: duration,
                date: timeNow
              }

              impactArr.push(impactObj)

              AsyncStorage.setItem("dailyImpact", JSON.stringify(impactArr));
            }
            else{

              impactArr[impactArr.length-1].price = Number(impactArr[impactArr.length-1].price) + Number(maskUsing.price);
              impactArr[impactArr.length-1].weight = Number(impactArr[impactArr.length-1].weight) + Number(maskUsing.weight);
              impactArr[impactArr.length-1].usage = Number(impactArr[impactArr.length-1].usage) + Number(duration);
              impactArr[impactArr.length-1].date = timeNow;

              AsyncStorage.setItem("dailyImpact", JSON.stringify(impactArr));
            }
          }
        }

      }
      else{
        let masksWornHistory = await AsyncStorage.getItem("masksWornHistory");

        if(masksWornHistory != null)
        {
          let recentMask = JSON.parse(masksWornHistory)[0];

          let mask = {}
          let maskList = await AsyncStorage.getItem("masksList");
          maskList = JSON.parse(maskList)
  
          for(let i = 0; i < maskList.length; i++)
          {
            if(maskList[i].id == recentMask.maskID){
              mask = maskList[i];
            }
          }

          AsyncStorage.setItem("currentMaskUsing", JSON.stringify(mask));
          AsyncStorage.setItem("wearStarted", String(timeNow));

          console.log("hi")
  
          this.setState({maskUsing: mask, maskUseBegun: timeNow}, () => {this.intervalId = setInterval(this.timer.bind(this), 1000);}); 
          

          console.log("hi")
        }
      }

    }
    catch(e){
      console.log(e)
    }

  }

  // const masksHistoryList = MasksSelected();

  // render() {
    render() {

      const {
        state: {
          maskWearingColors,
          maskWearingMesseges,
          notifications,
          // netInfo,
          expoPushToken,
          notification,
          notificationsSent,
          intervalRef,
          maskUsing,
          maskUseBegun,
          wearingMaskColor,
          wearingMaskLabel,
          wearingMaskTimeLeft,
          notificationListener,
          responseListener,
        },
        props: { navigation },
      } = this;
  
      return (
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View style={styles.homeVeiw} >
          <View style={[styles.maskWearingCont, styles.shadow, {backgroundColor: maskWearingColors[wearingMaskColor]}]}>
              <View style={styles.wearingMaskDot}></View>
              <Text style={styles.wearingMaskLabel}>{maskWearingMesseges[wearingMaskLabel]}</Text>
              <Text style={styles.timeLeft}>{this.timeLeftFormat()}</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => navigation.push('Select Mask Menu')}>
              <View style={[styles.button, styles.shadow]}>
                <View style={[styles.btnIcon ]}>
                  <Image source={ require('../assets/mask-white.png') } style={styles.imageStyle} />
                </View>
                <View style={[styles.btnInfo ]}>
                  <Text style={[styles.btnInfoHeader, {color: "white"}]}>Select Mask</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.push('History')}>
              <View style={[styles.button, styles.shadow, {backgroundColor: 'white'}]}>
                <View style={[styles.btnIcon ]}>
                  <Image source={ require('../assets/history-blue.png') } style={styles.imageStyle} />
                </View>
                <View style={[styles.btnInfo]}>
                  <Text style={[styles.btnInfoHeader, {color: "black"}]}>History</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.push('Events')}>
              <View style={[styles.button, styles.shadow, styles.prevMask, {backgroundColor: "#f5695f"}]}>
                <View style={[styles.btnIcon ]}>
                  <Image source={ require('../assets/calendar.png')  } style={styles.imageStyle} />
                </View>
                <View style={[styles.btnInfo ]}>
                  <Text style={[styles.btnInfoHeader, {color: "white"}]}>{"Events"} </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {this.wearOrRemoveMask()}}>
              <View style={[styles.button, styles.shadow, styles.prevMask]}>
                <View style={[styles.btnIcon ]}>
                  <Image source={ maskUsing == null ? require('../assets/history-white.png') : require('../assets/cross.png')  } style={styles.imageStyle} />
                </View>
                <View style={[styles.btnInfo ]}>
                  <Text style={[styles.btnInfoHeader, {color: "white"}]}>{maskUsing === null ? "Wear Recent Mask" : "Remove Mask"} </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={[styles.healthMessage, styles.shadow]}>
              <View style={[styles.healthMessageHeader]}>
                <View style={[styles.healthIconCont ]}>
                  <Image source={ require('../assets/warningBell.png') } style={styles.healthIcon} />
                </View>
                <View style={[styles.healthHeader ]}>
                  <Text style={styles.btnInfoHeader}>Guidelines</Text> 
                  {/* Guidelines from NHS */}
                </View>
              </View>
              <View style={[styles.btnInfoDescriptionCont ]}>
                {/* <Text style={styles.btnInfoDescription}> */}
                  <Text style={{marginBottom: 0}}>Wash or sanitise your hands before putting it on{'\n'}</Text>
                  <Text style={{marginBottom: 0}}>Ensure the mask goes up to the bridge of your nose and all the way down under your chin{'\n'}</Text>
                  <Text style={{marginBottom: 0}}>Tighten the loops or ties so it’s snug around your face{'\n'}</Text>
                  <Text style={{marginBottom: 0}}>Avoid touching your face, or the parts of the mask that cover your nose and mouth{'\n'}</Text>
                  <Text style={{marginBottom: 0}}>Wash or sanitise your hands before taking it off{'\n'}</Text>
                  <Text style={{marginBottom: 0}}>Use the ear loops to take the mask off and wash or sanitise your hands afterwards{'\n'}</Text>
                {/* </Text> */}
              </View>
            </View>

            <View style={[styles.healthMessage, styles.shadow]}>
              <View style={[styles.healthMessageHeader]}>
                <View style={[styles.healthIconCont ]}>
                  <Image source={ require('../assets/questionmark.png') } style={styles.healthIcon} />
                </View>
                <View style={[styles.healthHeader ]}>
                  <Text style={styles.btnInfoHeader}>How to use ?</Text> 
                </View>
              </View>
              <View style={[styles.btnInfoDescriptionCont ]}>
                {/* <Text style={styles.btnInfoDescription}> */}
                  <Text style={{marginBottom: 0}}>1. Tap on "Select Masks" to choose masks to wear and get a link to the purchase page (UK only for now).{'\n'}</Text>
                  <Text style={{marginBottom: 0}}>2. Once you purchase the mask, add it.{'\n'}</Text>
                  <Text style={{marginBottom: 0}}>3. Go back and tap on "Your Masks" to find the mask you have just added (assuming you have purchased it).{'\n'}</Text>
                  <Text style={{marginBottom: 0}}>4. Tap on your mask and tap on "Wear". MaskIt assumes you are wearing a mask now.{'\n'}</Text>
                  <Text style={{marginBottom: 0}}>5. Tap on "Remove Mask" to remove the mask.{'\n'}</Text>
                  <Text style={{marginBottom: 0}}>6. Tap on "Events" to create an event and to let MaskIt know when to remind you to wear your mask.{'\n'}</Text>
                  <Text style={{marginBottom: 0, fontWeight: "bold"}}>Keep in mind the app has a recommended continuous period of wearing a mask of 6 hours. If you are still out for more than 6 hours, we encourage you to NOT throw your mask away, until you get back home.{'\n'}</Text>
                {/* </Text> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      );
  }
}

const styles = StyleSheet.create({
  button:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
    backgroundColor: 'rgba(91, 116, 249, 1.0)',
    // borderTopRightRadius: 10,
    // borderBottomRightRadius: 10,
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10,
    borderRadius: 10,
    padding:10,
  },
  prevMask:{
    backgroundColor: "#52b4eb",
  },
  btnIcon:{
    paddingRight: 10
  },
  // btnIcon:{
  //   backgroundColor: 'rgba(0, 0, 0, 0.05)',
  //   paddingTop: 30,
  //   paddingBottom: 30,
  //   paddingLeft: 22,
  //   paddingRight: 22,
  //   borderTopLeftRadius: 10,
  //   borderBottomLeftRadius: 10,
  // },
  // btnInfo:{
  //   // backgroundColor: 'rgba(52, 52, 52, 0.0)',
  //   flexShrink: 1,
  //   borderTopRightRadius: 10,
  //   borderBottomRightRadius: 10,
  //   padding: 20,
  //   flex: 1,
  // },
  // btnIconPrev:{
  //   backgroundColor: 'rgba(0, 0, 0, 0.05)',
  //   borderTopLeftRadius: 10,
  //   borderBottomLeftRadius: 10,
  //   paddingLeft: 22,
  //   paddingRight: 22,
  // },
  imageStylePrev:{
    height: 58,
    width: 64,
  },

  imageStyle:{
    height: 48,
    width: 48,
  },

  healthMessage:{
    marginTop: 22,
    flexDirection: "column",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
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
  btnInfoDescription:{
    fontSize: 14,
    fontFamily: Defaults.text.fontFamily,
    textAlign: "left",
    alignSelf: 'stretch',
  },
  healthMessageHeader:{
    flexDirection: "row",
    marginBottom: 20,
  },
  healthIcon:{
    height: 36,
    width: 36,
    marginRight: 20,
  },
  healthHeader:{
    flexShrink: 1,
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
  homeVeiw:{
    padding: 30,
    backgroundColor: Defaults.pallete.background,
    // flex: 1,
    // flexDirection: "column",
    //   justifyContent: "flex-end",
  },
  maskWearingCont:{
    backgroundColor: "#F2F2F2",
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 20 / 2,
  },
  timeLeft:{
    color: "#fff",
    fontWeight: "400",
    fontSize: 16,
  },
  wearingMaskLabel:{
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    flexGrow: 1,
    fontFamily: Defaults.text.fontFamily
  },
  wearingMaskDot:{
    height: 18,
    width: 18,
    borderRadius: 20 / 2,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 2,
    opacity: 0.5,
    marginRight: 15,
  }
});