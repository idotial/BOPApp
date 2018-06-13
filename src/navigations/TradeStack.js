//@flow
import {createStackNavigator} from 'react-navigation';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo'
import {
  Text
} from 'react-native';
import TradeScreen from '../screens/home/TradeScreen';
import HelpScreen from '../screens/home/HelpScreen';

const TradeStack = createStackNavigator({
  TradeMain: TradeScreen,
  HelpTrade: HelpScreen,
},{
  initialRouteName: 'TradeMain',
  navigationOptions: {
    title: 'Trade',
    headerStyle: {
        backgroundColor: '#000000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
})

TradeStack.navigationOptions = ({navigation}) => {
  return {
    tabBarIcon: ({focused, tintColor}) => (
      <Entypo name="swap" size={focused? 35: 25} color={tintColor} />
    ),
  }
}

export {TradeStack}
