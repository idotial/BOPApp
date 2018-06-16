//@flow
import {createStackNavigator} from 'react-navigation';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather'
import {
  Text,
} from 'react-native';
import SettingScreen from '../screens/home/SettingScreen';
import HelpScreen from '../screens/home/HelpScreen';

const SettingStack = createStackNavigator({
  Setting: SettingScreen,
  Help: HelpScreen,
},{
  initialRouteName: 'Setting',
  navigationOptions: {
    title: 'Setting',
    headerStyle: {
        backgroundColor: '#000000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
})

SettingStack.navigationOptions = ({navigation}) => {
  return {
    tabBarIcon: ({focused, tintColor}) => (
      <Feather name="settings" size={focused? 35: 25} color={tintColor} />
    ),
  }
}

export {SettingStack}
