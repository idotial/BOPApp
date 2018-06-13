//@flow
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import LoginSuccessScreen from '../screens/auth/LoginSuccessScreen';
import RegistScreen from '../screens/auth/RegistScreen';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Login: LoginScreen,
    LoginSuccess: LoginSuccessScreen,
    Regist: RegistScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
