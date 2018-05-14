import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    console.log('enter authloading');
    super(props);
    this._bootstrapAsync();
  }

  componentWillUnmount(){
    console.log('AuthLoadingScreen componentWillUnmount');
  }

  componentDidMount(){
    console.log('AuthLoadingScreen componentDidMount');
  }


  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = () => {
     storage.load({
	     key: 'user',
	      id: '1001',
        autoSync: false,
      }).then(ret => {
        console.log(ret);
        this.props.navigation.navigate('LoginSuccess');
      }).catch(err => {
        console.log(err);
        this.props.navigation.navigate('Login');
      });

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
