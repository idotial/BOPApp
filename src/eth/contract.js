/* @flow */
import {CONTRACT_ABI, CONTRACT_ADDRESS} from './../config/constants/eth';
import {web3, BOP_Contract} from './../config/eth';
import {wallet} from './wallet';

class ContractHelper {
  asyncGetGasLimit = (method: string, ...params: [string]) => { //promise
    console.log(BOP_Contract.methods[method](...params));
    // BOP_Contract.methods[method](...params).estimateGas().then(result => console.log('gas: ' + result));
    return BOP_Contract.methods[method](...params).estimateGas({from: wallet.account.address});
  }

  asyncGetGasPrice = () => {
    return web3.eth.getGasPrice();
  }

  generateData = (method: string, ...params: [string]) => {
    console.log('generateData: ' + BOP_Contract.methods[method](...params).encodeABI());
    return BOP_Contract.methods[method](...params).encodeABI();
  }

  asyncGenerateSignedTransaction = (data: string, gas: string, gasPrice :string) => {
    let rawTx = {
      to: CONTRACT_ADDRESS,
      data: data,
      gasPrice: gasPrice,
      gas: gas,
    }
    console.log('generateTransaction');
    // web3.eth.accounts.signTransaction(rawTx, this.account.privateKey).then(console.log)
    // return web3.eth.accounts.signTransaction(rawTx, this.account.privateKey)
    wallet.account.signTransaction(rawTx).then(console.log)
    return wallet.account.signTransaction(rawTx)
  }

  asyncSendTransaction = (tx: string) => {
    return web3.eth.sendSignedTransaction(tx);
  }

  asyncCallMethod = (method: string, address: string, ...params: [string]) => {
    return BOP_Contract.methods[method](...params).call({
      from: address,
    })
  }
}

export const contractHelper = new ContractHelper()
