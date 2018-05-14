/* @flow */
// import DetailsScreen from './DetailScreen';
import Home from './Home';
import { createTabNavigator } from 'react-navigation';

export default createTabNavigator({
  Home: Home,
  // Details: DetailsScreen,
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
