//@flow
import React, {Component} from 'react';
import {
  Button,
  Modal,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import {wallet} from '../eth/wallet';

type Props = {
  importDidSuccess: Function,
  importCancel: Function,
}

type State = {
  importType:string,
  password: string,
  importData:string,
  test: string,
}

export default class ImportAccount extends Component<Props, State> {
  state = {
    importType: 'mnemonic',
    password: '',
    importData: '',
    test: '',
  }

  componentDidMount = () => {
    console.log('ImportAccountModal componentDidMount');
  }

  componentWillUnmount = () => {
    console.log('ImportAccountModal componentWillUnmount');
  }

  _importingAccount = () => {
    var newKeystore = ''
    switch (this.state.importType) {
      case 'keystore':
        wallet.importAccountFromKeyStore(this.state.importData, this.state.password)
        newKeystore = JSON.parse(this.state.importData)
        break;
      case 'privateKey':
        newKeystore = wallet.importAccountFromPrivateKey(this.state.importData, this.state.password)
        break;
      default:
        newKeystore = wallet.importAccountFromMnemonic(this.state.importData, this.state.password)
    }
    this.props.importDidSuccess(newKeystore)
  }

  importTypeString = () => {
    var typeName = ''
    switch (this.state.importType) {
      case 'keystore':
        typeName = 'keystore导入'
        break;
      case 'privateKey':
        typeName = '私钥导入'
        break;
      default:
        typeName = '助记词导入'
    }
    return typeName
  }

  _finishEntering = (event: Object) => {
    var pressedKey = event.nativeEvent.key
    if (pressedKey == 'Enter') {
      this._importingAccount()
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <View>
            <TextInput style={styles.title} value={this.importTypeString()} />
            <TextInput style={styles.title} value={this.state.test} />
            <TextInput autoCorrect={false} placeholder={'请输入密码'} value={this.state.password} onChangeText={(password) => {this.setState({password})}} />
            <TextInput autoCorrect={false} onKeyPress={this._finishEntering} returnKeyType='go' placeholder={'请输入'+this.state.importType} multiline={true} value={this.state.importData} onChangeText={(importData) => {this.setState({importData})}} />
            <Picker
              selectedValue={this.state.importType}
              style={{ height: 40}}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({importType: itemValue})
                this.state.importData = ''
              }}>
              <Picker.Item label="助记词导入" value="mnemonic" />
              <Picker.Item label="keystore导入" value='keystore' />
              <Picker.Item label="私钥导入" value="privateKey" />
            </Picker>
          </View>

          <View style={styles.buttons}>
            <Button title='确认' onPress={this._importingAccount} />
            <Button title='取消' onPress={this.props.importCancel} />
          </View>
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#240bed',
  },
  input:{
    borderLeftWidth:20,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#313131',
    marginTop: 30,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 400,
  },
})
