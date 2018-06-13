//@flow
import {createStackNavigator} from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import TradeListScreen from '../screens/home/TradeListScreen';
import HelpScreen from '../screens/home/HelpScreen';

const TradeListStack = createStackNavigator({
  TradeListMain: TradeListScreen,
  HelpTrade: HelpScreen,
},{
  initialRouteName: 'TradeListMain',
  navigationOptions: {
    title: 'TradeList',
    headerStyle: {
        backgroundColor: '#000000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
})

TradeListStack.navigationOptions = ({navigation}) => {
  return {
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="md-list-box" size={focused? 35: 25} color={tintColor} />
    ),
  }
}

export {TradeListStack}
