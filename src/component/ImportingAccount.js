//@flow
import React, {Component} from 'react';
import {
  Alert,
  // Button,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {ButtonGroup, Button} from 'react-native-elements';
import {wallet} from '../eth/wallet';

type Props = {
  importDidSuccess: Function,
  importCancel: Function,
}

type State = {
  selectedIndex: number,
  password: string,
  repeatPassword: string,
  importData:string,
}

export default class ImportAccount extends Component<Props, State> {
  state = {
    selectedIndex: 0,
    password: '',
    repeatPassword: '',
    importData: '',
  }

  importArray = ['Mnemonic','KeyStore','privateKey']

  componentDidMount = () => {
    console.log('ImportAccountModal componentDidMount');
  }

  componentWillUnmount = () => {
    console.log('ImportAccountModal componentWillUnmount');
  }

  _importingAccount = () => {
    var newKeystore = {}
    if (this.state.password.length > 8) {
      switch (this.state.selectedIndex) {
        case 1:
        console.log(this.state.importData, this.state.password);
          wallet.importAccountFromKeyStore(this.state.importData, this.state.password)
          newKeystore = JSON.parse(this.state.importData)
          break;
        case 2:
          if (this.state.password == this.state.repeatPassword) {
            console.log(this.state.importData, this.state.password);
            newKeystore = wallet.importAccountFromPrivateKey(this.state.importData, this.state.password)
          } else {
            Alert.alert('two passwords are different')
          }
          break;
        default:
          if (this.state.password == this.state.repeatPassword) {
            console.log(this.state.importData, this.state.password);
            newKeystore = wallet.importAccountFromMnemonic(this.state.importData, this.state.password)
          } else {
            Alert.alert('two passwords are different')
          }
      }
      this.props.importDidSuccess(newKeystore)
    } else {
      Alert.alert('password too short')
    }
  }

  importTypeString = () => {
    switch (this.state.selectedIndex) {
      case 1:
        return 'keystore'
      case 2:
        return 'private key'
      default:
        return 'mnemonic'
    }
  }

  updateImportType = (selectedIndex: number) => {
    if (this.state.selectedIndex != selectedIndex) {
      this.setState({selectedIndex})
      this.setState({importData: ''})
    }
  }

  _finishEntering = (event: Object) => {
    if (event.nativeEvent.key == 'Enter') {
      this._importingAccount()
    }
  }

  render() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}  >
            <ButtonGroup
              onPress={this.updateImportType}
              selectedIndex={this.state.selectedIndex}
              buttons={this.importArray}
              buttonStyle={styles.headButtonStyle} selectedButtonStyle={styles.selectedHeadButtonStyle}
              textStyle={styles.headButtonTextStyle} selectedTextStyle={styles.selectedHeadButtonTextStyle}
              containerStyle={{height: 60}}
            />
            <View style={{flex: 1, alignItems: 'center', justifyContent:'space-evenly'}}>
              <ScrollView
                centerContent
                contentContainerStyle ={{height: 100}}
                keyboardDismissMode='on-drag'
              >
                <TextInput style={styles.input}
                  autoCapitalize='none' autoCorrect={false}
                  multiline={true}
                  onKeyPress={this._finishEntering} returnKeyType='go' blurOnSubmit={true}
                  mutip
                  placeholder={'please input '+this.importTypeString()} value={this.state.importData}
                  onChangeText={(importData) => {this.setState({importData})}}
                />
              </ScrollView>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none' autoCorrect={false} secureTextEntry={this.state.selectedIndex!=1}
                  placeholder={'please input password(at lease 8 letter)'} value={this.state.password}
                  onChangeText={(password) => {this.setState({password})}}
                />
                {this.state.selectedIndex!=1 && (
                  <TextInput
                    style={styles.input}
                    autoCapitalize='none' autoCorrect={false} secureTextEntry={true}
                    placeholder={'please repeat password'} value={this.state.repeatPassword}
                    onChangeText={(repeatPassword) => {this.setState({repeatPassword})}}
                  />
                )}
              </View>
              <View style={styles.buttons}>
                <Button title='import' onPress={this._importingAccount} />
                <Button title='cancel' onPress={this.props.importCancel} />
              </View>
            </View>

          </View>
        </TouchableWithoutFeedback>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  headButtonStyle: {
    backgroundColor: '#212121',
  },
  headButtonTextStyle: {
    color: '#DDDDDD',
  },
  selectedHeadButtonTextStyle: {
    color: '#1E080B',
  },
  selectedHeadButtonStyle: {
    backgroundColor: '#EDB000',
  },
  input:{
    backgroundColor: 'white',
    fontSize: 16,
    width: 260,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  passwordContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent:'space-around'
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 30,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})
