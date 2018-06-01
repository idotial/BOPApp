//@flow
import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {wallet} from '../../eth/wallet';
import * as Keychain from 'react-native-keychain';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async() => {
     // try {
     //   let address = (await storage.load({
     //     key: 'currentUser',
     //     autoSync: false,
     //   })).address
     //   console.log(address);
     //   var keystore = await Keychain.getInternetCredentials('BOP.account.'+address)
     //   if (!keystore) {
     //     throw '不存在账号'
     //   }
     //   console.log(JSON.parse(keystore.password));
     if (wallet.isAlive()) {
       this.props.navigation.navigate('LoginSuccess');
     } else {
       this.props.navigation.navigate('Regist');
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
