import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import AuthLoadingScreen from './auth/AuthLoadingScreen';
import LoginScreen from './auth/LoginScreen';
import LoginSuccessScreen from './auth/LoginSuccessScreen';
import RegistScreen from './auth/RegistScreen';

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
