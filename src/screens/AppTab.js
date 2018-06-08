/* @flow */
import TradeScreen from './home/TradeScreen';
import TradeListScreen from './home/TradeListScreen';
import ReferralScreen from './home/ReferralScreen';
import BankrollScreen from './home/BankrollScreen';
import { createBottomTabNavigator } from 'react-navigation';
// import { generateData } from './../eth/contract';
//
// console.log(generateData('test(uint256,uint256,uint256)', 33, 42, 6));

export default createBottomTabNavigator({
  Trade: TradeScreen,
  TradeList: TradeListScreen,
  Referral: ReferralScreen,
  Bankroll: BankrollScreen,
},
{
    initialRouteName: 'Trade',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#212121',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    tabBarOptions: {
      activeBackgroundColor: '#111111',
      inactiveBackgroundColor:'#111111',
      activeTintColor: '#EDB000',
      inactiveTintColor: '#9E9E9E',
    }
  }
);
