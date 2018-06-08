/* @flow */
import React, {
  Component
}
from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
}
from 'react-native';
import * as Keychain from 'react-native-keychain'
import Entypo from 'react-native-vector-icons/Entypo'
import { VictoryLine, VictoryChart, VictoryTheme} from "victory-native";
import {storage} from '../../config/storage';
import { SERVER_ADDRESS } from '../../config/constants/config';
import {wallet} from '../../eth/wallet';
import CommonHeader from '../../component/CommonHeader';
// import {getPrivateKey, createAccountInRandomBuffer} from './../../eth/wallet';

const data = [

  { quarter: 7, earnings: 17000 },
  { quarter: 4, earnings: 19000 },
  { quarter: 6, earnings: 15000 },
  { quarter: 1, earnings: 17000 },
  { quarter: 5, earnings: 12000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
];

type Props = {};

type State = {
  password: string,
  address: string,
  memric: string,
}

export default class TradeScreen extends Component < Props, State > {
  static navigationOptions = {
      title: 'Home',
      tabBarIcon: ({focused, tintColor}) => (
        <Entypo name="swap" size={focused? 35: 25} color={tintColor} />
      ),
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
        <CommonHeader />
        <VictoryChart
          theme={VictoryTheme.material}
        >
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc"}
            }}
            data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
    // marginTop: 140,
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

// <Button title = "login"
//  onPress = {this.getcookie}/>
//  <Button title = "send"
//    onPress = {this.sendRequest}/>
  // <Button title = "sign"
  //   onPress = {this.postSign}/>
  // <Button title = "clear data"
  //   onPress = {
  //     () => {
  //       storage.remove({
  //         key: 'currentUser',
  //       });
  //       Keychain.resetInternetCredentials('BOP.account.' + wallet.account.address)
  //       this.props.navigation.navigate('AuthLoading');
  //       /* 1. Navigate to the Details route with params */
  //       // this.props.navigation.navigate('Auth');
      // }
    // }
  // />
