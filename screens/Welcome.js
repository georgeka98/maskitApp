import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Dimensions} from 'react-native';
import {products} from '../constrains/WelcomeConstrains.ts'; 
import WelcomeView from './WelcomeView';
import palette from '../constrains/Defaults.ts';
import layouts from '../constrains/Layouts.ts';

export default function Welcome({ navigation }) {

  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = layouts.window; // deconstructs the get object by returning only it's width and height

  const setSliderPage = (event) => {

    const { x } = event.nativeEvent.contentOffset; // deconstructs the contentoffset object by returning only it's x value
    const indexOfNextScreen = Math.floor(x / width) < 0 ? 0 : Math.floor(x / width);
    const { currentPage } = sliderState; // deconstructs the contentoffset sliderState by returning only currentPage value

    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }

  }

  const { currentPage: pageIndex } = sliderState;

  const scroll = React.useRef(null);

  return (

    <>
      <StatusBar barStyle="dark-content" />
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            setSliderPage(event);
          }}
          ref={scroll}
        >

          {/* rendering each page */}
          {Array.from(products).map(function(name, index){
            return <WelcomeView key={index} idx={index} img={products[index].img} title={products[index].title} description={products[index].description} navigation={navigation} totSlides={products.length} scroll={scroll}></WelcomeView>
          })}

        </ScrollView>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(products.length).keys()).map((index) => (
            <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
          ))}
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  paginationWrapper: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 1000,
  },
  paginationDots: {
    height: 15,
    width: 15,
    borderRadius: 15 / 2,
    backgroundColor: palette.light.main,
    marginLeft: 8,
    marginRight: 8,
  }
});
