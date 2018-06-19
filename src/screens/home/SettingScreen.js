// @flow
import React, {Component} from 'react';
import {
  Alert,
  Clipboard,
  Dimensions,
  Text,
  TextInput,
  StyleSheet,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PendingTransaction from './../../component/PendingTransaction'
import * as Keychain from 'react-native-keychain';
import {wallet} from '../../eth/wallet';
import {storage} from '../../config/storage';
import I18n from '../../i18n/i18n';

type State = {

};

const {height, width} = Dimensions.get('window')

export default class SettingScreen extends Component {
  static navigationOptions = ({ navigation}) => {
    return {
      headerRight:
      <SimpleLineIcons
        name='question'
        size={25}
        color='white'
        style={{paddingRight: 18}}
        onPress={() => {navigation.navigate('Help')}}
      />,
    }
  };

  copyAddress = () => {
    Clipboard.setString(wallet.account.address)
    Alert.alert(I18n.t('common.copied'))
  }

  exportAccount = async() => {
    var keystore = (await Keychain.getGenericPassword()).password
    this.props.navigation.navigate('ExportKeystore', {keystore: keystore})
  }

  deleteData = () => {
    storage.remove({
	     key: 'currentUser'
    });
    Keychain.resetGenericPassword();
    wallet.clear()
    this.props.navigation.navigate('AuthLoading')
  }

  // state={}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{wallet.account.address}</Text>
          <FontAwesome
            name='copy'
            size={16}
            color='#FFBD00'
            onPress={this.copyAddress}
          />
        </View>
        <View style={styles.optionContainer}>
          <Button
            title='balance'
            backgroundColor='#363636'

          />
          <Button
            title='export'
            backgroundColor='#363636'
            onPress={this.exportAccount}
          />
          <Button
            title='delete'
            color='red'
            backgroundColor='#363636'
            onPress={this.deleteData}
          />
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#212121',
  },
  addressContainer: {
    marginTop: height * 0.1,
    flexDirection: 'row',
  },
  addressText: {
    width: width * 0.7,
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
  optionContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  buttonStyle: {
    backgroundColor: '#363636',
  }
})
