//@flow
import React, {Component} from 'react'
import {
  Alert,
  Dimensions,
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native'
import {Button} from 'react-native-elements';
import {wallet} from '../eth/wallet';

type Props = {
  createDidSuccess: Function,
  createCancel: Function,
}

type State = {
  password: string,
  createState: number,
  mnemonic: string,
  keystore: Object,
}

var {height, width} = Dimensions.get('window')

export default class CreateAccount extends React.Component<Props, State> {
  state = {
    password: '',
    createState: 0,
    mnemonic: '',
    keystore: null,
  }

  sleep = (ms: number) =>{
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  createDidFinished = () => {
    this.props.createDidSuccess(this.state.keystore)
  }

  createAccount = async() => {
    this.setState({createState: 1})
    if (this.state.password.length > 7) {
      const pro = new Promise((resolve, reject) => {
        var result = wallet.createAccountWithMnemonic(this.state.password)
        try {
          resolve(result)
        } catch (e) {
          reject(e)
        }
      })
      try {
        var {keystore, mnemonic} = await pro
        this.setState({keystore, mnemonic})
        this.setState({createState:2})
      } catch (e) {
        this.setState({createState: 0})
        Alert.alert('账号生成失败', e)
      }
    } else {
      this.setState({createState: 0})
      Alert.alert('Password too short', 'As lease 8 letter')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text>
            <Text style={[styles.whiteText, styles.title]}>Block</Text>
            <Text style={[styles.yellowText, styles.title]}>option</Text>
          </Text>
          <Text style={styles.subTitle} >Superior smart trade expert</Text>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            autoCapitalize='none' autoCorrect={false}
            placeholder={'input keystore password'} value={this.state.password}
            onChangeText={(password) => {this.setState({password})}}
          />
          <Button
            raised
            rounded
            outline
            component={{padding: 0}}
            containerViewStyle={styles.buttonContainer}
            title={this.state.createState == 1 ? '': 'create'}
            loading={this.state.createState==1}
            disable={this.state.createState==1}
            onPress={this.createAccount}
          />
        </View>
        <View style={styles.revealContainer}>
          {this.state.mnemonic && (
            <View style={styles.mnemonicContainer}>
              <Text style={styles.attentionText}>please save the mnemonic below</Text>
              <TextInput multiline editable={false} style={styles.mnemonicText}>{this.state.mnemonic}</TextInput>
            </View>
          )}
        </View>
        <View style={styles.bottomButtonsArea}>
          {this.state.keystore && (
            <Button title='finish' onPress={this.createDidFinished}/>
          )}
          <Button title='cancel' onPress={this.props.createCancel}/>
        </View>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  titleContainer: {
    height: height * 0.2,
    paddingTop: height * 0.1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  yellowText: {
    color: '#FFBD00',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 17,
    color: '#AAAAAA',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around',
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonContainer: {
    width: 100,
    height: 60,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 0,
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
  revealContainer: {
    flex: 1,
  },
  mnemonicContainer: {
    marginTop: height * 0.1,
    alignItems: 'center',
  },
  attentionText: {
    fontSize: 19,
    color: 'red',
  },
  mnemonicText: {
    fontSize: 25,
    color: '#FFBD00',
  },
  bottomButtonsArea: {
    height: height * 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
