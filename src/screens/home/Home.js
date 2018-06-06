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
import {storage} from '../../config/storage';
import { SERVER_ADDRESS } from '../../config/constants/config';
import * as Keychain from 'react-native-keychain'
import {wallet} from '../../eth/wallet';
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

export default class Home extends Component < Props, State > {
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

  sendRequest = async() => {
    var response = await fetch(SERVER_ADDRESS + '/users', {credentials: 'same-origin'})
    // console.log(Fetch);
  }

  getcookie = async() => {
    var response = await fetch(SERVER_ADDRESS, {credentials: 'same-origin'})
    console.log(response);
  }

  postSign = async() => {
    var nonce = await fetch(SERVER_ADDRESS+'/users/getnonce', {credentials: 'same-origin'})
    var tt = await nonce.json()
    console.log(tt);
    var send = JSON.stringify(wallet.signData(tt.nonce))
    console.log(send);
    // nonce.json().then(data => {console.log(data)})
    // console.log((await nonce.body.getReader().read()));
    // console.log();
    await fetch(SERVER_ADDRESS+'/users/post', {
      headers: {
   　　　　 'Accept': 'application/json',
   　　　　 'Content-Type': 'application/json',
 　　　　 },
      credentials: 'same-origin',
      method: 'post',
      body: send,
    })
  }

  render() {
    return (
      <View style ={styles.container}>
        <Button title = "login"
          onPress = {this.getcookie}/>
        <Button title = "send"
          onPress = {this.sendRequest}/>
        <Button title = "sign"
          onPress = {this.postSign}/>
        <Button title = "clear data"
          onPress = {
            () => {
              storage.remove({
                key: 'currentUser',
              });
              Keychain.resetInternetCredentials('BOP.account.' + wallet.account.address)
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
