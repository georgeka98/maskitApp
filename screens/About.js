import React, { Component } from "react";

import Defaults from "../constrains/Defaults";
import {StyleSheet, Keyboard, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, SafeAreaView, Linking} from 'react-native';
import layouts from "../constrains/Layouts";
import Autolink from 'react-native-autolink';

const { width, height } = layouts.window;

export default function About({navigation}) {

  // render() {
    return (

      <View style={styles.homeVeiw}>
        <ScrollView>
          <View >
            <Text style={styles.info}>
              This app was built with ❤️ by 3 enthusiasts: George Karabassis, Andrien Zier and Eve Bogomil.
              {"\n"}
              {"\n"}
              This app won an innovative-type competition "Hack 4 the People" in August 2020 and thanks to the recognition by the Google Cloud Hackathon program and the help of our mentor "Shyam Sabhaya", it was brought to you, 100% free with no ads.
              {"\n"}
              {"\n"}
              We clearly understand the situation and we wanted to provide help, while the pandemic is sadly, still with us and restrictions are still in place. We believe maximum protection at this moment is a must, and we thought that this app, would provide a use to those who are still very concerned by the pandemic and would like to stay even more protected, by choosing better and more suited masks for you.
              {"\n"}
              {"\n"}
              The sole purpose of MaskIt, is to provide you with a list of masks to choose from which best match with your activity or your work. For example, if you go out just for a walk, what's the best mask to use? How about working in a construction site? The app will filter the best suited masks for these purposes. MaskIt, will also send you a notification when it's recommended to remove your mask. Of course, if you are still out and you don't have access to a second mask, we HIGHLY encourage you to KEEP wearing your current mask. MaskIt also allows you to create events which involve you going out. In that case, MaskIt will send you a reminder to wear your mask before going out.
              {"\n"}
              {"\n"}
              It's important to know that this app is still in "experimental mode" or "beta" version and some features have not fully been implemented just yet. For example, the settings page is still in development and you may experience some crashes from time to time. If that's the case, please help us understand the issues by reporting them, or feel free to <Text style={{color: "red", textDecorationLine: "underline"}} onPress={() => Linking.openURL('https://twitter.com/intent/tweet?text=Hi @g_karabassis, there is an issue on MaskIt.')}>Tweet George Karabassis by clicking here</Text> with a few details to let him know about the problem, or <Text style={{color: "red", textDecorationLine: "underline"}} onPress={() => Linking.openURL('mailto:georgek981@yahoo.com?subject=Problem found on MaskIt&body=Hi George,\n\nI found a problem on MaskIt. The problem is...')}>email George by clicking here</Text>. We aim to release the official version of this app no later than the 15th of May 2021.
              {"\n"}
              {"\n"}
              © 2021 Copyright: ncovtrack.com - All Rights Reserved
            </Text>
            {/* <AutoLink
         text="email2 (mailto:georgek981@yahoo.com)"
       /> */}
          </View>
        </ScrollView>
      </View>
    );
  // }
}

const styles = StyleSheet.create({
  
  homeVeiw:{
    padding: 30,
    flex:1,

  },

  bg:{
    flexGrow: 1,
  },

  ScrollView:{
    // flex:1,
  },
  
  info:{
    fontSize: 16,
  },

});
