//@flow
import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {wallet} from '../../eth/wallet';
import {storage} from '../../config/storage';
import * as Keychain from 'react-native-keychain';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async() => {
     if (wallet.isAlive()) {
       this.props.navigation.navigate('LoginSuccess');
     } else {
       try {
         await storage.load({
           key: 'currentUser',
         })
         this.props.navigation.navigate('Login')
       } catch (e) {
         this.props.navigation.navigate('Regist');
       }
     }
  };

  render() {
    return (
      <View>
        <ActivityIndicator animating={true} size="large"/>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
