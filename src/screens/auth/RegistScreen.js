//@flow
import React, {Component} from 'react';
import {
  Alert,
  View,
  Button,
  Modal,
  StyleSheet,
  Text,
} from 'react-native';
import ImportAccount from '../../component/ImportingAccount';
import {wallet} from './../../eth/wallet'
import * as Keychain from 'react-native-keychain'
import { storage } from '../../config/storage';

type State = {
  modalState: number,
}

type Prop = {

}

export default class RegistScreen extends React.Component<Prop, State> {
  state = {
    modalState: 0,
  }

  _showImportModal = () => {
    console.log(wallet.createAccountWithMnemonic('1234567'));
    this.setState({modalState: 1})
  }

  _quitModal = () => {
    this.setState({modalState: 0})
  }

  _storeAccount = async(keystore: Object) => {
    try {
      var addr = keystore.address
      if (!addr.startsWith('0x')) {
        addr = '0x' + addr
      }
      await storage.save({
        key: 'currentUser',
        data: {
          address: addr,
        },
        expires: null,
      }) ;
      await Keychain.setInternetCredentials('BOP.account.0x' + addr, keystore.address, JSON.stringify(keystore), {accessControl: Keychain.ACCESS_CONTROL.USER_PRESENCE})
      this._quitModal()
      this.props.navigation.navigate('AuthLoading')
    } catch (e) {
      Alert.alert('Keystore存储失败, 请不要使用这个账户', '可复制以下信息发送给客户处理此问题: ' + e)
    }
  }

  render() {
    return (
      <View sytle={styles.container}>
        <Text style={styles.title}>初次使用请导入账号</Text>
        <Button title='import' onPress={this._showImportModal}/>
        <Modal animationType='slide' visible={this.state.modalState == 1? true: false}>
          <ImportAccount importCancel={this._quitModal} importDidSuccess={this._storeAccount}/>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#313131',
    marginTop: 10
  },
})
