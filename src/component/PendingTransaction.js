//@flow
import {
  View,
  Text,
  Button,
} from 'react-native';
import React, {Component} from 'react';
import TransactionHelper from './../eth/contract'

type Props = {
  // coinbase: string,
  pk: string,
  method: string,
  params: [string],
}

type State = {
  gasLimit: number,
  gasPrice: number,
  data: string,
  tx: Object,
}

export default class PendingTransaction extends Component<Props, State> {
  state = {
    gasLimit: 0,
    gasPrice: 0,
    data: '',
    tx: {},
  }

  transactionHandler:TransactionHelper

  componentDidMount = async() => {
    this.transactionHandler = new TransactionHelper('78814d2a155910fe3d968934ee99427a5974bfa666f3a4a822f5300d1af735b6');
    this.setState({
      data: this.transactionHandler.generateData('setuinttttt', '3414'),
      gasLimit: await this.transactionHandler.asyncGetGasLimit('setuinttttt', '3414'),
    });

  }

  _generateTransaction = async() => {
    this.setState({tx: await this.transactionHandler.asyncGenerateSignedTransaction(this.state.data, this.state.gasLimit)})

    // this.transactionHandler._asyncSendTransaction(this.state.data);
  }

  sendPackedTransaction = async() => {
    console.log('start');
    this.transactionHandler._asyncSendTransaction(this.state.tx.rawTransaction).then(console.log).catch(console.log)
    console.log('done');
  }

  render(){
    return (
      <View>
        <Text><Text>data: </Text>{this.state.data}</Text>
        <Text><Text>gasLimit: </Text>{this.state.gasLimit}</Text>
        <Text><Text>data: </Text>{this.state.data}</Text>
        <Button title='generate' onPress={ this._generateTransaction }></Button>
        <Button title='send' onPress={ this.sendPackedTransaction }></Button>
      </View>
    )
  }
}
