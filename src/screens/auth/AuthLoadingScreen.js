//@flow
import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import * as Keychain from 'react-native-keychain';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async() => {
     // storage.load({
	   //   key: 'user',
	   //    id: '1001',
     //    autoSync: false,
     //  }).then(ret => {
     //    console.log(ret);
     //    this.props.navigation.navigate('LoginSuccess');
     //  }).catch(err => {
     //    console.log(err);
     //    this.props.navigation.navigate('Login');
     //  });
     try {
       let address = (await storage.load({
         key: 'currentUser',
         autoSync: false,
       })).address
       console.log(address);
       var keystore = await Keychain.getInternetCredentials('BOP.account.'+address)
       if (!keystore) {
         throw '不存在账号'
       }
       console.log(JSON.parse(keystore.password));
       this.props.navigation.navigate('LoginSuccess');
     } catch (e) {
       console.log(e);
       this.props.navigation.navigate('Login');
     }

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator animating={true} size="large"/>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
