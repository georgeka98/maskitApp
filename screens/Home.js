import React from "react";

import {StyleSheet, Keyboard, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, Image} from 'react-native';
import Defaults from "../constrains/Defaults";
// import styled from 'styled-components';

export default function Home({navigation}) {

  const [wearingMaskColor, setWearingMaskColor] = React.useState(0);
  const [wearingMaskLabel, setWearingMaskLabel] = React.useState("Currently Wearing Mask");
  const [wearingMaskTimeLeft, setwearingMaskTimeLeft] = React.useState(120); // in minutes

  // 0 = green
  // 1 = orange
  // 2 = red

  let maskWearingColors = ["#3ED47D", "#EFCC74", "#EF7474"];

  const getWearingMaskTimeLeft = async () =>{
    // get from Firebase
  }

  // DONT DELETE BELOW'S code!!! Use a timer)

  // if(wearingMaskTimeLeft <= 60){
  //   setWearingMaskLabel("Throw away soon");
  //   setWearingMaskColor(2);
  // }
  // else if (wearingMaskTimeLeft > 60 && wearingMaskTimeLeft < 120){
  //   setWearingMaskColor(1);
  // }
  // else{
  //   setWearingMaskColor(0);
  // }

  const timeLeffFormat = () => {

    let hours = Math.floor(wearingMaskTimeLeft / 60);
    let minutes = wearingMaskTimeLeft % 60;

    return hours+"h "+minutes+"m";

  }

  // render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.homeVeiw} >
          <View style={[styles.maskWearingCont, styles.shadow, {backgroundColor: maskWearingColors[wearingMaskColor]}]}>
            <View style={styles.wearingMaskDot}></View>
            <Text style={styles.wearingMaskLabel}>{wearingMaskLabel}</Text>
            <Text style={styles.timeLeft}>{timeLeffFormat()}</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => selectMask()}>
            <View style={[styles.button, styles.shadow]}>
              <View style={[styles.btnIcon ]}>
                <Image source={ require('../assets/mask.png') } style={styles.imageStyle} />
              </View>
              <View style={[styles.btnInfo ]}>
                <Text style={styles.btnInfoHeader}>Select Mask</Text>
                <Text style={styles.btnInfoDescription}>Choose a mask to purchase/use depending on your activity.</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => selectMask()}>
            <View style={[styles.button, styles.shadow]}>
              <View style={[styles.btnIcon ]}>
                <Image source={ require('../assets/history.png') } style={styles.imageStyle} />
              </View>
              <View style={[styles.btnInfo ]}>
                <Text style={styles.btnInfoHeader}>History</Text>
                <Text style={styles.btnInfoDescription}>Mask you worn in the past and impact caused in the enviroment.</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={[styles.healthMessage, styles.shadow]}>
            <View style={[styles.healthMessageHeader]}>
              <View style={[styles.healthIconCont ]}>
                <Image source={ require('../assets/warningBell.png') } style={styles.healthIcon} />
              </View>
              <View style={[styles.healthHeader ]}>
                <Text style={styles.btnInfoHeader}>Guidelines from NHS</Text>
              </View>
            </View>
            <View style={[styles.btnInfoDescriptionCont ]}>
              <Text style={styles.btnInfoDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  // }
}

const styles = StyleSheet.create({
  button:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },
  btnIcon:{
    backgroundColor: "#F2F2F2",
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 22,
    paddingRight: 22,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  btnInfo:{
    backgroundColor: "#fff",
    flexShrink: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20
  },
  imageStyle:{
    height: 64,
    width: 64,
  },

  healthMessage:{
    marginTop: 22,
    flexDirection: "column",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
  },
  btnInfoHeader:{
    fontSize: 24,
    fontWeight: "700",
    fontFamily: Defaults.text.fontFamily,
  },
  btnInfoDescription:{
    fontSize: 14,
    fontFamily: Defaults.text.fontFamily,
  },
  btnInfoDescriptionCont:{
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
  },
  maskWearingCont:{
    backgroundColor: "#F2F2F2",
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
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