import { StyleSheet, View, Image, PixelRatio, Text} from 'react-native';
import Layouts from '../constrains/Layouts.ts';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import layouts from '../constrains/Layouts.ts';
import { welcomeBtnStyles } from '../styles/welcomeBtn';
import defaults from '../constrains/Defaults';
import AppButton from '../components/TouchButton';

import * as Permissions from 'expo-permissions';
import { Constants, Notifications } from 'expo';

export default function WelcomeView( props ) {

  const [welcomeScreen, setWelcomeScreen] = useState();
  const { width, height } = layouts.window; // deconstructs the get object by returning only it's width and height

  // save/update item
  const save = async () => {

    try {
      // setWelcomeScreen({"welcomeScreen": '1'})
      await AsyncStorage.setItem( 'welcomeScreen', '1' );

      props.navigation.navigate('Register');

    } catch (error) {
      // Error saving data
      console.log(props)
      alert(error)
    }
  }

  // remove item
  const remove = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
  }

  state = {
    notification: {},
  };

  async function getiOSNotificationPermission() {

    if(props.idx == 2){
      const { status } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      if (status !== 'granted') {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
      }
    }
  }

  // useEffect(() => {
  //   remove('welcomeScreen');
  // }, [])

  return(
    <View style={{ width: Layouts.window.width, height: Layouts.window.height, backgroundColor: "#fff"} }>
      <View style={styles.image}>
        <Image source={props.img } style={styles.imageStyle} />
      </View>
      <View style={styles.infoCont}>
        <Text style={styles.header}>{props.title}</Text>
        <Text style={styles.text}>{props.description}</Text>

        {props.idx === props.totSlides-1 ? <AppButton title="Done"  onPress={() => save()} btnStyle={welcomeBtnStyles.btn}  textStyle={welcomeBtnStyles.btnText}  /> : <></> }
        {props.idx === 0 ? <AppButton title="Get Started" onPress={() => { props.scroll.current.scrollTo({x: width*(props.idx + 1), y: 0, animated: true}) }} btnStyle={welcomeBtnStyles.btn}  textStyle={welcomeBtnStyles.btnText} /> : <></> }
        {props.idx > 0 && props.idx < props.totSlides-1 ? <AppButton title="Next" onPress={() => { props.scroll.current.scrollTo({x: width*(props.idx + 1), y: 0, animated: true}); getiOSNotificationPermission(props.idx); }} btnStyle={welcomeBtnStyles.btn}  textStyle={welcomeBtnStyles.btnText}  /> : <></> }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    height: Layouts.window.height / 2,
    justifyContent: 'center',
  },
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(170),
    width: '80%',
  },
  text: {
    backgroundColor: '#fff',
    fontFamily: defaults.text.fontFamily,
    fontSize: 16,
    width: "80%",
    textAlign: "center"
  },
  infoCont:{
    alignItems: 'center',
    height: Layouts.window.height / 2,
  },
  header:{
    fontWeight: "700",
    fontFamily: defaults.text.fontFamily,
    fontSize: 20,
    marginBottom: 20,
  },
  btn: welcomeBtnStyles.btn,
  btnText: welcomeBtnStyles.btnText
});