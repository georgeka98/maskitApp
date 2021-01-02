import palette from '../constrains/Defaults';
import { StyleSheet } from 'react-native'

const welcomeBtnStyles = StyleSheet.create({
  btn: {
    backgroundColor: palette.light.main,
    fontFamily: "Avenir",
    textTransform: "uppercase",
    borderRadius: 30,
    padding: 15,
    minWidth: 150,
    position: 'absolute',
    bottom: 190,
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