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
  transactionDidCancel: Function,
}

type State = {
  gasLimit: string,
  gasPrice: string,
  data: string,
  tx: Object,
  isLoading: boolean,
}

export default class PendingTransaction extends Component<Props, State> {
  state = {
    gasLimit: '0',
    gasPrice: '0',
    data: '',
    tx: {},
    isLoading: true,
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
    console.log(this.state);
    this.setState({isLoading: false})
    // this.loadingIndicator.animating = false
  }

  _generateTransaction = async() => {
    this.setState({tx: await this.contractHelper.asyncGenerateSignedTransaction(this.state.data, this.state.gasLimit, this.state.gasPrice)})

    // this.contractHelper._asyncSendTransaction(this.state.data);
  }

  sendPackedTransaction = async() => {
    console.log('start');
    await this._generateTransaction()
    this.contractHelper.asyncSendTransaction(this.state.tx.rawTransaction).then(this.props.transactionDidSend).catch(console.log)
    console.log('done');
  }

  render(){
    return (
      <View>
        <View style={styles.field}>
          <Text style={styles.label}>from</Text>
          <Text
            style={styles.label}
            value={this.contractHelper.account.address} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>GasPrice</Text>
          <TextInput
            style={styles.input}
            value={this.state.gasPrice}
            onChangeText={(gasPrice) => this.setState({gasPrice})} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>GasLimit</Text>
          <TextInput
            style={styles.input}
            value={this.state.gasLimit}
            onChangeText={(gasLimit) => this.setState({gasLimit})} />
        </View>
        <ActivityIndicator animating={this.state.isLoading} size="large" color="#f7040b" />
        <View style={styles.buttonsView}>
          <Button title='send' onPress={ this.sendPackedTransaction } disabled={this.state.isLoading} />
          <Button title='cancel' onPress={ this.props.transactionDidCancel} disabled={this.state.isLoading} />
        </View>

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
  field: {
    marginVertical: 5,
  },
  label: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    backgroundColor: 'white',
    height: 32,
    fontSize: 14,
    padding: 8,
  },
  validstyle:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
