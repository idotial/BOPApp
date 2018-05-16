import {CONTRACT_ABI, CONTRACT_ADDRESS, RPC_PROVIDER} from './constants/eth';

var Web3 = require('web3');

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(RPC_PROVIDER));
global.web3 = web3;
console.log(web3);
// web3.eth.getCoinbase((error, result) => {
//   console.log("result: " + result)
//   web3.eth.getBalance(result).then(result => {
//     console.log("balance: " + result);
//   })
// })
global.BOP_Contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
// console.log(web3.eth.getBalance(web3.eth.coinbase));
