//@flow
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import React, {Component} from 'react';
import ContractHelper from './../eth/contract'

type Props = {
  // coinbase: string,
  pk: string,
  method: string,
  params: [string],
  transactionDidSend: Function,
}

type State = {
  gasLimit: string,
  gasPrice: string,
  data: string,
  tx: Object,
}

export default class PendingTransaction extends Component<Props, State> {
  state = {
    gasLimit: '0',
    gasPrice: '0',
    data: '',
    tx: {},
  }

  contractHelper:ContractHelper

  componentDidMount = async() => {
    console.log(require('util').inspect(this.props));
    this.contractHelper = new ContractHelper(this.props.pk);
    this.setState({
      //
      gasLimit: (await this.contractHelper.asyncGetGasLimit(this.props.method, ...this.props.params)).toString(),
      gasPrice: (await this.contractHelper.asyncGetGasPrice()).toString(),
      data: this.contractHelper.generateData(this.props.method, ...this.props.params),
    });
    await this._generateTransaction()
    console.log(this.state);
  }

  _generateTransaction = async() => {
    this.setState({tx: await this.contractHelper.asyncGenerateSignedTransaction(this.state.data, this.state.gasLimit)})

    // this.contractHelper._asyncSendTransaction(this.state.data);
  }

  sendPackedTransaction = async() => {
    console.log('start');
    this.contractHelper.asyncSendTransaction(this.state.tx.rawTransaction).then(console.log).catch(console.log)
    console.log('done');
  }

  render(){
    return (
      <View>
        <Text>gasPrice: </Text>
        <TextInput style={styles.input} value={this.state.gasLimit} onChangeText={(gasLimit) => this.setState({gasLimit})} />
        <ActivityIndicator size="large" color="#f7040b" />
        <Button title='generate' onPress={ this._generateTransaction }></Button>
        <Button title='send' onPress={ this.sendPackedTransaction }></Button>
      </View>
        )
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightblue'
  },
  input:{
    fontSize: 19,
    fontWeight: 'bold',
    width: 150,
  },
  validstyle:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
});
