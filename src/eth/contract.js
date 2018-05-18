/* @flow */
import {CONTRACT_ABI, CONTRACT_ADDRESS} from './../config/constants/eth';

export default class ContractHelper {
  account = {}
  constructor(pk:string) {
    console.log('TransactionHandler init');
    this.account = web3.eth.accounts.privateKeyToAccount(pk);
    console.log(this.account);
  }

  asyncGetGasLimit = (method: string, ...params: [string]) => { //promise
    BOP_Contract.methods[method](...params).estimateGas().then(result => console.log('gas: ' + result));
    return BOP_Contract.methods[method](...params).estimateGas();
  }

  asyncGetGasPrice = () => {
    return web3.eth.getGasPrice();
  }

  generateData = (method: string, ...params) => {
    console.log('generateData: ' + BOP_Contract.methods[method](...params).encodeABI());
    return BOP_Contract.methods[method](...params).encodeABI();
  }

  asyncGenerateSignedTransaction = (data, gas) => {
    let rawTx = {
      to: CONTRACT_ADDRESS,
      data: data,
      gas: gas,
    }
    console.log('generateTransaction');
    // web3.eth.accounts.signTransaction(rawTx, this.account.privateKey).then(console.log)
    // return web3.eth.accounts.signTransaction(rawTx, this.account.privateKey)
    this.account.signTransaction(rawTx).then(console.log)
    return this.account.signTransaction(rawTx)
  }

  asyncSendTransaction = (tx) => {
    return web3.eth.sendSignedTransaction(tx);
  }

  asyncCallMethod = (method: string, address: string, ...params) => {
    return BOP_Contract.methods[method](...params).call({
      from: address,
    })
  }
}
