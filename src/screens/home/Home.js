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
import {getPrivateKey, createAccountInRandomBuffer} from './../../eth/wallet';

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
    console.log(navigation);
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
                key: 'user',
                id: '1001'
              });
              this.props.navigation.navigate('AuthLoading');
              /* 1. Navigate to the Details route with params */
              // this.props.navigation.navigate('Auth');
            }
          }
        />
        <Button title = "create account"
          onPress = {
            () => {this.setState({address: createAccountInRandomBuffer(this.state.password)})
            }
          }
        />
        <Button title = "get account"
          onPress = {
            () => {
              storage.load({
                key: 'eth.account',
                id: this.state.address,
              }).then(ret => {
                console.log(ret);
                console.log(web3.eth.accounts.decrypt(ret, this.state.password));
              })
            }
              /* 1. Navigate to the Details route with params */
              // this.props.navigation.navigate('Auth');
          }
        />

        <TextInput style={styles.edit} value={this.state.address} />
        <TextInput style={styles.edit} value={this.state.password} onChangeText={(password) => this.setState({password})} />
        <Button
          title='getpk'
          onPress={async() => {
            console.log(await getPrivateKey(this.state.address, this.state.password));
          }}/>

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
