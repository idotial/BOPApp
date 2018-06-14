//@flow
import React, {Component} from 'react';
import {
  Alert,
  Button,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Divider, Icon, Badge} from 'react-native-elements';
import ImportAccount from '../../component/ImportingAccount';
import CreateAccount from '../../component/CreateAccount';
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
    this.setState({modalState: 2})
  }

  _showCreateModal = () => {
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
      await Keychain.setGenericPassword(addr, JSON.stringify(keystore), {accessControl: Keychain.ACCESS_CONTROL.USER_PRESENCE})
      this._quitModal()
      this.props.navigation.navigate('AuthLoading')
    } catch (e) {
      Alert.alert('Keystore存储失败, 请不要使用这个账户', '可复制以下信息发送给客户处理此问题: ' + e)
    }
  }

  render() {
    return (
            <View style={styles.container}>
              <StatusBar hidden={true} />
              <View style={styles.subContainer}>
                <Icon
                  type='MaterialIcons'
                  name='account-balance-wallet'
                  color='#A8A9A9'
                  size={41}
                  containerStyle={styles.iconContainer}
                  onPress={this._showCreateModal}
                />
                <Badge
                  value='create account'
                  textStyle={styles.descText}
                  containerStyle={styles.descBadgeContainer}
                  wrapperStyle={styles.descBadgeWrapper}
                />
                <Modal animationType='slide' visible={this.state.modalState == 1? true: false}>
                  <CreateAccount importCancel={this._quitModal} importDidSuccess={this._storeAccount}/>
                </Modal>
              </View>
              <Divider style={{height: 1, width: 264, backgroundColor: '#111111'}} />
              <View style={styles.subContainer}>
                <Icon
                  type='entypo'
                  name='upload'
                  color='#A8A9A9'
                  size={41}
                  containerStyle={styles.iconContainer}
                  onPress={this._showImportModal}
                />
                <Badge
                  value='import account'
                  textStyle={styles.descText}
                  containerStyle={styles.descBadgeContainer}
                  wrapperStyle={styles.descBadgeWrapper}
                />
                <Modal animationType='slide' visible={this.state.modalState == 2? true: false}>
                  <ImportAccount importCancel={this._quitModal} importDidSuccess={this._storeAccount}/>
                </Modal>
              </View>
            </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#212121',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 93,
    width: 93,
    borderRadius: 46,
    backgroundColor: '#181818'
  },
  descBadgeWrapper: {
    marginTop: 18,
  },
  descBadgeContainer: {
    width: 126,
    backgroundColor: '#181818',
    paddingBottom: 6,
    paddingTop: 7,
  },
  descText: {
    color: '#A8A9A9',
    fontSize: 12,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#313131',
    marginTop: 10
  },
})
