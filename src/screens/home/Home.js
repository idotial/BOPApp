/* @flow */
import React, {
  Component
}
from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  View
}
from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Home extends Component < Props > {
  static navigationOptions = ({
    navigation
  }) => {
    return {
      title: 'Home',
    }
  };

  render() {
    return (
      <View style ={
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }
      }>
        <Text> Home Screen </Text> <Button title = "Go to Details"
          onPress = {
            () => {
              /* 1. Navigate to the Details route with params */
              this.props.navigation.navigate('Details');
            }
          }/>
        <Button title = "clear data"
          onPress = {
            () => {
              storage.remove({
                key: 'user',
                id: '1001'
              });
              this.props.navigation.navigate('AuthLoading');
              /* 1. Navigate to the Details route with params */
              // this.props.navigation.navigate('Auth');
            }
          }
        /> </View>
    );
  }
}
