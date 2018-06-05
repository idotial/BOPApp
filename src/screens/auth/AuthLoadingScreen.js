//@flow
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { wallet } from '../../eth/wallet';
import { SERVER_ADDRESS } from '../../config/constants/config';
import { storage } from '../../config/storage';
import * as Keychain from 'react-native-keychain';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async() => {
     if (wallet.isAlive()) {
       try {
         // var nonce = await fetch(SERVER_ADDRESS, {credentials: 'include'}).toString()
         // await fetch(SERVER_ADDRESS, {
         //   credentials: 'include',
         //   method: 'POST',
         //   body: JSON.stringify(wallet.signData(nonce))
         this.props.navigation.navigate('LoginSuccess');
       } catch (e) {
         Alert.alert('服务器验证失败', e)
         this.props.navigation.navigate('Login')
       }
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
