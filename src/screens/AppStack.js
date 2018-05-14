/* @flow */
import DetailsScreen from './DetailScreen';
import Home from './Home';
import { createBottomTabNavigator } from 'react-navigation';
import './../eth/contract';

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
