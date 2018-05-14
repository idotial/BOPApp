import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default class LoginSuccessScreen extends React.Component {
  constructor(props) {
    console.log('enter LoginSuccessScreen');
    super(props);
    this._bootstrap();
  }

  componentWillUnmount(){
    console.log('LoginSuccessScreen componentWillUnmount');
  }

  componentDidMount(){
    console.log('LoginSuccessScreen componentDidMount');
  }


  // Fetch the token from storage then navigate to our appropriate place
  _bootstrap = () => {
    this.props.navigation.navigate('App');
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
