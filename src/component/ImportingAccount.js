//@flow
import React, {Component} from 'react';
import {
  Button,
  Modal,
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
  password: string,
  data:string,
}

export default class ImportAccount extends Component<Props, State> {
  state = {
    password: '341314341241234',
    data: 'wwwww',
  }

  componentDidMount = () => {
    console.log('ImportAccountModal componentDidMount');
  }

  componentWillUnmount = () => {
    console.log('ImportAccountModal componentWillUnmount');
  }



  render() {
    return (
        <View>
          <Text style={styles.title}>导入账号</Text>
          <TextInput multiline={true} value={this.state.password} onChangeText={(password) => {this.setState(password)}} />
          <TextInput multiline={true} value={this.state.data} onChangeText={(data) => {this.setState(data)}} />
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
    marginTop: 20,
  },
})
