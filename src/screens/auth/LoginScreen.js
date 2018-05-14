import React, {Component} from 'react';
import {
  View,
  Button,
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await storage.save({
	       key: 'user',  // Note: Do not use underscore("_") in key!
	       id: '1001',	  // Note: Do not use underscore("_") in id!
	       data: "userAdddd",
	       expires: 1000 * 180
      });
    this.props.navigation.navigate('AuthLoading');
  };
}
