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
  TextInput,
  View,
}
from 'react-native';
import * as Keychain from 'react-native-keychain'
// import {getPrivateKey, createAccountInRandomBuffer} from './../../eth/wallet';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

type State = {
  password: string,
  address: string,
  memric: string,
}

export default class Home extends Component < Props > {
  static navigationOptions = ({
    navigation
  }) => {
    // console.log(navigation);
    return {
      title: 'Home',
    }
  };

  state = {
    password: '',
    address: '',
    memric: '',
  }

  render() {
    return (
      <View style ={styles.container}>
        <Button title = "Go to Details"
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
                key: 'currentUser',
              });
              Keychain.resetInternetCredentials('BOP.account.0xa984D0105f4fb5080F9EB282a53EC0C0bC6c1Cb5')
              this.props.navigation.navigate('AuthLoading');
              /* 1. Navigate to the Details route with params */
              // this.props.navigation.navigate('Auth');
            }
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'purple',
    marginTop: 140,
  },
  textInput:{
    fontSize: 14,
    // width: 200,
    // height: 15,
  },
  edit: {
    marginTop: 30,
    height:40,
    fontSize:20,
    backgroundColor: '#fff',
  },
})
