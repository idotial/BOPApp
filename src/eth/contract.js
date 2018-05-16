/* @flow */
import {CONTRACT_ABI, CONTRACT_ADDRESS} from './../config/constants/eth';

export default class TransactionHelper {
  account: any
  constructor(pk:string) {
    console.log('TransactionHandler init');
    this.account = web3.eth.accounts.privateKeyToAccount(pk);
    console.log(this.account);
  }

  asyncGetNonce = () => { //promise
    return web3.eth.getTransactionCount(this.account.address);
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
    web3.eth.accounts.signTransaction(rawTx, this.account.privateKey).then(console.log)
    return web3.eth.accounts.signTransaction(rawTx, this.account.privateKey)
  }

  _asyncSendTransaction = (tx) => {
    return web3.eth.sendSignedTransaction(tx);
  }
}

class CallHelper {
  from: string
  constructor(address) {
    this.from = address
  }
}
