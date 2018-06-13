/* @flow */
import {TradeStack} from './TradeStack';
import {TradeListStack} from './TradeListStack';
import ReferralScreen from '../screens/home/ReferralScreen';
import BankrollScreen from '../screens/home/BankrollScreen';
import { createBottomTabNavigator } from 'react-navigation';
// import { generateData } from './../eth/contract';
//
// console.log(generateData('test(uint256,uint256,uint256)', 33, 42, 6));

export default createBottomTabNavigator({
  TradeStack: TradeStack,
  TradeList: TradeListStack,
  Referral: ReferralScreen,
  Bankroll: BankrollScreen,
},
{
    initialRouteName: 'TradeStack',
    /* The header config from HomeScreen is now here */
    tabBarOptions: {
      activeBackgroundColor: '#111111',
      inactiveBackgroundColor:'#111111',
      activeTintColor: '#EDB000',
      inactiveTintColor: '#9E9E9E',
    }
  }
);
