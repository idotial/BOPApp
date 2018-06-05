//@flow
import React, {Component} from 'react';
import {
  Alert,
  View,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import {wallet} from './../../eth/wallet'
import * as Keychain from 'react-native-keychain'
import {storage} from '../../config/storage';

type Props = {}

type State = {
  currentAddr: string,
  pwd: string,
  loginable: boolean,
}

export default class LoginScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Please sign in',
  };

  state = {
    currentAddr: '',
    pwd: '',
    loginable: true,
  }

  componentDidMount = async () => {
    try {
      var addr = (await storage.load({
        key: 'currentUser',
        autoSync: false,
      })).address
      if (!this.state.currentAddr.startsWith('0x')) {
        addr = '0x' + addr
      }
      this.state.currentAddr = addr
    } catch (e) {
      this.state.loginable = false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder='请输入你的keystore解锁密码' value={this.state.pwd} onChangeText={(pwd) => {this.setState({pwd})}} />
        <Button title="Sign in!" disabled={!this.state.loginable} onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    if (this.state.currentAddr) {
      // var keystone = JSON.stringify(wallet.generateKeystore('0xa1e95324f2284a1a944ebd0f49cd1aa8d4931f2e19ef51effe83e3c36d63001c', '123456'))
      // console.log(keystone);
      // await Keychain.setInternetCredentials('BOP.account.0xa984D0105f4fb5080F9EB282a53EC0C0bC6c1Cb5', '0xa984D0105f4fb5080F9EB282a53EC0C0bC6c1Cb5', keystone, {accessControl: Keychain.ACCESS_CONTROL.USER_PRESENCE})
      var keystore = (await Keychain.getInternetCredentials('BOP.account.'+this.state.currentAddr)).password
      if (!keystore) {
        Alert.alert('登录失败', 'keystore不存在')
      }
      wallet.importAccountFromKeyStore(keystore, this.state.pwd)
      this.props.navigation.navigate('AuthLoading');
    }

  };

  _registAsync = async () => {

  }

}



const styles = StyleSheet.create({
  container:{
    paddingTop:30,
  },
})
