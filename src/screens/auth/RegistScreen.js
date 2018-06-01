//@flow
import React, {Component} from 'react';
import {
  View,
  Button,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import ImportAccount from '../../component/ImportingAccount';
import {wallet} from './../../eth/wallet'
import * as Keychain from 'react-native-keychain'

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
    this.setState({modalState: 1})
  }

  _quitModal = () => {
    this.setState({modalState: 0})
  }

  render() {
    return (
      <View>
        <TextInput style={styles.title} value={this.state.modalState.toString()} />
        <Button title='import' onPress={this._showImportModal}/>
        <Modal animationType='slide' visible={this.state.modalState == 1? true: false}>
          <ImportAccount importCancel={this._quitModal} importDidSuccess={this._quitModal}/>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#313131',
    marginTop: 10
  },
})
