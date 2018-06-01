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
  data:string,
}

export default class ImportAccount extends Component<Props, State> {
  state = {
    importType: '0',
    password: '341314341241234',
    data: 'wwwww',
  }

  componentDidMount = () => {
    console.log('ImportAccountModal componentDidMount');
  }

  componentWillUnmount = () => {
    console.log('ImportAccountModal componentWillUnmount');
  }

  importTypeString = () => {
    var typeName = ''
    switch (this.state.importType) {
      case '1':
        typeName = 'keystore导入'
        break;
      case '2':
        typeName = '私钥导入'
        break;
      default:
        typeName = '助记词导入'
    }
    return typeName
  }

  render() {
    return (
        <View style={styles.container}>
          <View>
            <TextInput style={styles.title} pw={this.state.importType} value={this.importTypeString()} />
            <TextInput multiline={true} value={this.state.password} onChangeText={(password) => {this.setState(password)}} />
            <TextInput multiline={true} value={this.state.data} onChangeText={(data) => {this.setState(data)}} />
            <Picker
              selectedValue={this.state.importType}
              style={{ height: 50}}
              onValueChange={(itemValue, itemIndex) => this.setState({importType: itemValue})}>
              <Picker.Item label="助记词导入" value="0" />
              <Picker.Item label="keystore导入" value='1' />
              <Picker.Item label="私钥导入" value="2" />
            </Picker>
          </View>

          <View style={styles.buttons}>
            <Button title='确认' onPress={this.props.importDidSuccess} />
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
    marginTop: 10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 400,
  },
})
