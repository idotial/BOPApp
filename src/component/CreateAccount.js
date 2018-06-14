//@flow
import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native'
import {Button} from 'react-native-elements';

type Props = {
  importDidSuccess: Function,
  importCancel: Function,
}

type State = {
  password: string,
  creating: boolean,
}

export default class CreateAccount extends React.Component<Props, State> {
  state = {
    password: '',
    creating: false,
  }
  createAccount = () => {
    this.setState({creating: true})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            autoCapitalize='none' autoCorrect={false}
            placeholder={'please input password(at lease 8 letter)'} value={this.state.password}
            onChangeText={(password) => {this.setState({password})}}
          />
          <Button
            raised
            outline
            title='create'
            loading={this.state.creating}
            disable={this.state.creating}
            onPress={this.createAccount}
          />
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around'
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
})
