//@flow
import {
  StyleSheet,
  View,
  Text,
  TextInput,
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

  transactionHandler:TransactionHelper

  componentDidMount = async() => {
    this.transactionHandler = new TransactionHelper('78814d2a155910fe3d968934ee99427a5974bfa666f3a4a822f5300d1af735b6');
    this.setState({
      data: this.transactionHandler.generateData('setuinttttt', '3414'),
      gasLimit: (await this.transactionHandler.asyncGetGasLimit('setuinttttt', '3414')).toString(),
      gasPrice: (await this.transactionHandler.asyncGetGasPrice()).toString(),
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
        <Text>gasPrice: </Text>
        <TextInput style={styles.input} value={this.state.gasLimit} onChangeText={(gasLimit) => this.setState({gasLimit})} />

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
