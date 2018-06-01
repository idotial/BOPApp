/* @flow */
import React, {Component} from 'react'
import {
  StyleSheet,
  Button,
  Image,
  Modal,
  Picker,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {wordlists} from 'bip39';
import { wallet } from './../../eth/wallet'

type Props = {};
var { ...lt } = wordlists
console.log(lt);
type State = {
  input: string,
  language:string,
  modalVisible: boolean,
}

export default class UserInfo extends Component<Props, State> {
  state = {
    input: '',
    language: 'english',
    modalVisible: false,
  }

  generateMnemonic = () => {
    var newAcoutn = wallet.createAccountWithMnemonic(this.state.language)
    console.log(newAcoutn);
    this.setState({input: newAcoutn.mnemonic})
  }

  fromMnemonic = () => {
    console.log(wallet.importAccountFromMnemonic(this.state.input, this.state.language));
  }

  fromKeystore = (keystore: string, password: string) => {
    wallet.switchAccount(keystore, password)
    console.log(wallet.switchAccount(keystore, password));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.center}>
            {/* <Image style={styles.logo} source={aboutLogo} /> */}
            <Text style={styles.title}>BOP</Text>
            <Text style={styles.subtitle}>让生活更精彩</Text>
            <TextInput value={this.state.input} onChange={(input) => {this.setState(input)}}/>
            <View style={styles.buttons}>
              <Button
                title='助记词导入账号'
                onPress={this.fromMnemonic}
              />
            </View>
            <View style={styles.buttons}>
              <Button
                title='keystore导入账号'
                onPress={this.fromMnemonic}
              />
            </View>
            <TextInput value={this.state.language} onChange={(language) => {this.setState(language)}}/>
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.modalVisible}
            >
              <View style={{marginTop: 22}}>
                <View>
                  <Text>Hello World!</Text>

                  <TouchableHighlight
                    onPress={() => {
                      this.setState({modalVisible: !this.state.modalVisible});
                    }}>
                    <Text>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>

            <TouchableHighlight
              onPress={() => {
                this.setState({modalVisible: true});
              }}>
              <Text>Show Modal</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.disclaimerContent}>
              <Text style={[styles.disclaimer, { color: '#999999' }]}>
                免责声明：所有内容均来自:
              </Text>
              <Button
                style={[styles.disclaimer, { color: '#3e9ce9' }]}
                title='创建新账号'
                onPress={this.generateMnemonic}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20
  },
  center: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: 110,
    height: 110,
    marginTop: 50
  },
  version: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaaaaa',
    marginTop: 5
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#313131',
    marginTop: 10
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4e4e4e'
  },
  disclaimerContent: {
    flexDirection: 'column'
  },
  disclaimer: {
    fontSize: 14,
    textAlign: 'center'
  },
  bottomContainer: {
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
