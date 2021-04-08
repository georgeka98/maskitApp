import React, { Component, useState, setState, useEffect } from "react";

import { SearchBar, Image } from 'react-native-elements';
import Defaults from "../constrains/Defaults";
import { welcomeBtnStyles } from '../styles/welcomeBtn';
import {Linking, StyleSheet, ScrollView, Keyboard, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, Modal, TouchableOpacity, Animated} from 'react-native';
import AppButton from '../components/TouchButton';
import {dateFormat, durationFormat} from './helpers';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddMask({navigation}) {

    let masksListJSON = require("../masks_list.json")

    const [selectedMasks, setSelectedMasks] = useState([]);
    const [visibility,setVisibility] = useState(false);
    const [maskExpand,setMaskExpand] = useState({title: "f", image: "../assets/masks/mask-1.png", description: "", activity: "", purchase_link: "https://mask-it.com", id: "0"});
    const [search,setSearch] = useState('');
    const [maskList, setMaskList] = useState(masksListJSON)
    const [filteredList, setFilteredList] = useState(masksListJSON)

    const updateSearch = (search) => {
      setSearch( search );
      setFilteredList(maskList.filter(i=>i.name.includes(search)))
    };

    const viewMask = (title,image,description,activity,purchase_link,id,maxWearTime,cost) => {

      setVisibility(visibility => !visibility);
      setMaskExpand({title: title, image: image, description: description, activity: activity, purchase_link: purchase_link, id: id, maxWearTime: maxWearTime, cost: cost})
    }

    const selectMask = (maskID) => {

      storeData(maskID)

    }

    useEffect(() => {
      const getChosenMasks = async () => {
        let chosenMasks = await AsyncStorage.getItem('selectedMasks');

        await AsyncStorage.setItem( 'masksList', JSON.stringify(maskList) );

        if(chosenMasks != null){
          setSelectedMasks(JSON.parse(chosenMasks))
        }
      }
   
     getChosenMasks();

    }, [])

    const storeData = async (maskID) => {

      try {
        const masksArray = await AsyncStorage.getItem('selectedMasks');

        if(masksArray === null)
        {
          let array = JSON.stringify([maskID])

          await AsyncStorage.setItem( 'selectedMasks', array );
          setSelectedMasks([maskID])
        }
        else{
          let elements = JSON.parse(masksArray);

          console.log(elements)

          if(elements.length > 0){
            for(let i = 0; i < elements.length; i++)
            {
              if(elements[i] == maskID){
                elements.splice(i, 1);
                break;
              }
              if(i == elements.length - 1)
              {
                elements.push(maskID);
                break;
              }
            }
          }
          else{
            elements.push(maskID);
          }

          await AsyncStorage.setItem( 'selectedMasks', JSON.stringify(elements) );
          setSelectedMasks(elements)
        }

        setVisibility(false)

      } catch (error) {
        // Error saving data
        alert(error)
      }
  
      return true;
    }

    const ModalPoup = ({visible, children}) => {

      const scaleValue = React.useRef(new Animated.Value(0)).current;

      React.useEffect(() => {
        toggleModal();
      }, [visible]);

      const toggleModal = () => {
        if (visible) {
          setVisibility(true);
          Animated.spring(scaleValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          setTimeout(() => setVisibility(false), 200);
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      };

      return (
        <Modal transparent visible={visibility}>
          <View style={styles.modalBackGround}>
            <Animated.View
              style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
              {children}
            </Animated.View>
          </View>
        </Modal>
      );
    }


    return (
      <KeyboardAvoidingView behavior="padding">
  
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
        <ScrollView>
          <View style={styles.homeVeiw} >

            <ModalPoup visible={visibility}>
              <View style={{alignItems: 'center'}}>
                <View style={styles.header}>
                  <TouchableOpacity onPress={() => {setVisibility(false)}}>
                    <Image
                      source={require('../assets/x.png')}
                      style={{height: 30, width: 30}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={{uri: maskExpand.image}}
                  style={{height: 150, width: 150, marginVertical: 10}}
                />
              </View>

              <View style={{marginBottom: 50, fontSize: 20, textAlign: 'center', alignItems: 'center'}}>
                <View>
                  <Text style={styles.title}>{maskExpand.title}</Text>
                </View>

                <View>
                  <Text style={styles.description}>{maskExpand.description}</Text>
                </View>
                <View style={{alignSelf: 'left'}}>
                  <Text style={styles.maskStats}>Max Usage: {durationFormat((maskExpand.maxWearTime))}</Text>
                </View>
                <View style={{alignSelf: 'left'}}>
                  <Text style={styles.maskStats}>Price: {maskExpand.cost} $</Text>
                </View>
              </View>
              <AppButton title="Buy It"  onPress={() => Linking.openURL(maskExpand.purchase_link)} btnStyle={[welcomeBtnStyles.btn, styles.getit]}  textStyle={welcomeBtnStyles.btnText} />
              <AppButton title={selectedMasks.includes(maskExpand.id) ? "Remove" : "Add"}  onPress={() => {selectMask(maskExpand.id)}} btnStyle={[welcomeBtnStyles.btn, styles.add]}  textStyle={welcomeBtnStyles.btnText}  />
            </ModalPoup>

            <View style={styles.search} >
            <SearchBar
              placeholder="Type Here..."
              onChangeText={(value) => updateSearch(value)}
              value={search}
            />
            </View>
              {filteredList.map((item,index) => (
                <TouchableWithoutFeedback key={item.id} onPress={()=> {viewMask(item.name, item.image, item.description, item.activity, item.purchase_link, item.id, item.maxWearTime, item.price)}}>
                  <View style={[styles.button, styles.shadow, styles.prevMask]}>
                    <View style={[styles.btnIcon ]}>
                      <Image source={{uri: item.image}} style={styles.imageStyle} />
                    </View>
                    <View style={[styles.btnInfo]}>
                      <Text style={[styles.btnInfoHeader, {color: "white"}]}>{item.name}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    modalBackGround: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderRadius: 30,
      elevation: 30,
    },
    header: {
      width: '100%',
      height: 40,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },

  maskExpand:{
    position: "absolute",
    zIndex: 9999,
    left: 0,
  },
  homeVeiw:{
    padding: 30,
    position: "relative",
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

  getit:{
    bottom: 10,
    left: 10,
  },
  add:{
    bottom: 10,
    right: 10,
  },

  search:{
    marginBottom: 22, 
    borderRadius: 10,
  },
  title:{
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 14,
  },
  description:{
    fontSize: 16,
    marginBottom: 14,
  },
  maskStats:{
    fontSize: 16,
  }
});