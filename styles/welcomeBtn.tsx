import defaults from '../constrains/Defaults';
import { Dimensions, Platform, StyleSheet, PixelRatio } from 'react-native'

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const welcomeBtnStyles = StyleSheet.create({
  btn: {
    backgroundColor: defaults.pallete.main,
    fontFamily: "Avenir",
    textTransform: "uppercase",
    borderRadius: 30,
    padding: 15,
    minWidth: 120,
    position: 'absolute',
    bottom: SCREEN_HEIGHT/5 + ( Platform.OS === 'ios' ? 20 : 0),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.24,
    shadowRadius: 10.32,
    elevation: 16,
  },
  btnText:{
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 2,
    textAlign: "center" 
  }
});

export { welcomeBtnStyles } 