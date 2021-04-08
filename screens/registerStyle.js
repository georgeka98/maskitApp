
const React = require("react-native");
import defautls from "../constrains/Defaults";

export default {

    otherRegisterViewText:{
      padding: 3,
      fontStyle: 'italic',
      fontFamily: "Avenir",
      fontWeight: "300",
    },
    otherRegisterView:{
      flexDirection:"row",
      marginTop: 25
    },

    btnText:{
      color: "#fff",
      fontSize: 18,
      fontWeight: "500",
      letterSpacing: 1,
      textAlign: "center" 
    },

    JoinInView:{
      alignItems: 'center',
      flex: 1,
      paddingBottom: 60,
      paddingTop: 60,
      justifyContent: 'flex-end',
    },

btnDefault:{
  width: "90%",
  borderRadius: 10,
  backgroundColor: defautls.pallete.main,
  padding: 15,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.15,
  shadowRadius: 5.32,
  elevation: 8,
},
btnSuccess:{
  width: "50%",
  borderRadius: 10,
  backgroundColor: defautls.pallete.main,
  padding: 15,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.15,
  shadowRadius: 5.32,
  elevation: 8,
},



changeRegistrationBtn:{
    color: defautls.pallete.main,
    fontWeight: "300",
    letterSpacing: 0,
    // textAlign: "center",
    fontStyle: 'italic',
    fontSize: 14,
    lineHeight: 24,
},
containerView: {
  flex: 1,
  padding: 30,
},
loginScreenContainer: {
  padding: 30,
  flex: 1,
  alignItems: 'center',
},
logoText: {
  fontSize: 40,
  fontWeight: "800",
  marginTop: 150,
  marginBottom: 30,
  textAlign: 'center',
},
formTextInput: {
  width: 355,
  height: 60,
  fontSize: 16,
  borderRadius: 10,
  borderWidth: 2,
  borderColor: defautls.pallete.main,
  backgroundColor: defautls.pallete.lightMain,
  padding: 20,
},

loginButton: {
  backgroundColor: '#3897f1',
  borderRadius: 5,
  height: 45,
  marginTop: 10,
},
fbLoginButton: {
  height: 45,
  marginTop: 10,
  backgroundColor: 'transparent',
},
};
