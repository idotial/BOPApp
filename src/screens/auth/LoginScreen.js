import React, {Component} from 'react';
import {
  View,
  Button,
  StyleSheet,
} from 'react-native';
import {wallet} from './../../eth/wallet'
import * as Keychain from 'react-native-keychain'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await storage.save({
	       key: 'currentUser',	  // Note: Do not use underscore("_") in id!
	       data: {
           address: '0xa984D0105f4fb5080F9EB282a53EC0C0bC6c1Cb5',
         },
	       expires: 1000 * 900
      });
    var keystone = JSON.stringify(wallet.generateKeystore('0xa1e95324f2284a1a944ebd0f49cd1aa8d4931f2e19ef51effe83e3c36d63001c', '123456'))
    console.log(keystone);
    await Keychain.setInternetCredentials('BOP.account.0xa984D0105f4fb5080F9EB282a53EC0C0bC6c1Cb5', '0xa984D0105f4fb5080F9EB282a53EC0C0bC6c1Cb5', keystone, {accessControl: Keychain.ACCESS_CONTROL.USER_PRESENCE})
    this.props.navigation.navigate('AuthLoading');
  };
}

const styles = StyleSheet.create({
  container:{
    paddingTop:30,
  },
})
