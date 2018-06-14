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
  }

  componentDidMount = () => {
    this._bootstrapAsync()
  }

  _bootstrapAsync = async() => {
     if (wallet.isAlive()) {
       this.props.navigation.navigate('Regist');
       // this.props.navigation.navigate('LoginSuccess');
     } else {
       // this.props.navigation.navigate('LoginSuccess');
       this.props.navigation.navigate('Regist');
       // try {
       //   await storage.load({
       //     key: 'currentUser',
       //   })
       //   this.props.navigation.navigate('Login')
       // } catch (e) {
       //   this.props.navigation.navigate('Regist');
       // }
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
//
