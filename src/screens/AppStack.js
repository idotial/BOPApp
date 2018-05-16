/* @flow */
import DetailsScreen from './home/DetailScreen';
import Home from './home/Home';
import { createBottomTabNavigator } from 'react-navigation';
// import { generateData } from './../eth/contract';
//
// console.log(generateData('test(uint256,uint256,uint256)', 33, 42, 6));

export default createBottomTabNavigator({
  Home: Home,
  Details: DetailsScreen,
},
{
    initialRouteName: 'Home',
    backBehavior: true,
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);
