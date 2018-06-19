//@flow
import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import {wallet} from './../../eth/wallet'
import * as Keychain from 'react-native-keychain'
import {storage} from '../../config/storage';
import I18n from '../../i18n/i18n';

console.log(I18n);

type Props = {}

type State = {
  currentAddr: string,
  pwd: string,
  isLogining: boolean,
}

const {height, width} = Dimensions.get('window')

export default class LoginScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: I18n.t('auth.login.title'),
  };

  state = {
    currentAddr: '',
    pwd: '',
    isLogining: false,
  }

  componentDidMount = async () => {
    console.log(I18n);
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
      console.log(e);
    }
  }

  render() {
    return (
      <View>
        <Image
          resizeMode='cover'
          source={require('../../../asset/img/bj.png')}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.titleContainer}>
          <Text>
            <Text style={[styles.whiteText, styles.title]}>Block</Text>
            <Text style={[styles.yellowText, styles.title]}>option</Text>
          </Text>
          <Text style={styles.subTitle}>{I18n.t('auth.login.subTitle')}</Text>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            autoFocus
            secureTextEntry
            style={styles.input}
            autoCapitalize='none' autoCorrect={false}
            placeholder={I18n.t('auth.login.enterPassword')} value={this.state.pwd}
            onChangeText={(pwd) => {this.setState({pwd})}}
          />
          <Button
            raised
            rounded
            component={{padding: 0}}
            backgroundColor='#FFBD00'
            color='#212121'
            title={this.state.isLogining ? '': I18n.t('auth.login.login')}
            loading={this.state.isLogining}
            disable={this.state.isLogining}
            containerViewStyle={styles.buttonContainer}
            onPress={this._signInAsync}
          />
        </View>
      </View>
    );
  }

  _signInAsync = async () => {
    if (this.state.currentAddr) {
      this.setState({isLogining: true})
      var keystore = (await Keychain.getGenericPassword()).password
      if (!keystore) {
        Alert.alert(I18n.t('auth.login.loginFail'), I18n.t('auth.login.failForInvalidKeystore'))
      }
      try {
        await wallet.importAccountFromKeyStore(keystore, this.state.pwd)
        this.props.navigation.navigate('AuthLoading');
      } catch (e) {
        Alert.alert(I18n.t('auth.login.wrongPassword'))
        this.setState({isLogining: false})
      }
    }
  };
}



const styles = StyleSheet.create({
  titleContainer: {
    marginTop: height * 0.2,
    alignSelf: 'center',
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
    marginTop: height * 0.1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    marginLeft: 0,
    marginRight: 0,
  },
  input:{
    backgroundColor: 'white',
    fontSize: 16,
    width: width * 0.7,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
})
