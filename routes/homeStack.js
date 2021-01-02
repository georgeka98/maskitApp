
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Home from '../screens/Home';
import User from '../screens/User';

const screens = {
  // Home: {
  //   Screen: Home
  // },
  Login:{
    screen: Login,
    navigationOptions:  {
      title: 'Login',
      headerLeft: null,
      // gesturesEnabled: false,
    }
  },
  Register:{
    screen: Register,
  },
  Home:{
    screen: Home,
    navigationOptions:  {
      title: 'Home',
      headerLeft: null,
      // gesturesEnabled: false,
    }
  },
  User:{
    screen: User,
  },
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);