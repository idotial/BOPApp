import {CONTRACT_ABI, CONTRACT_ADDRESS} from './constants/eth';

var Web3 = require('web3');

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));
global.web3 = web3;
console.log(web3);
// web3.eth.getCoinbase((error, result) => {
//   console.log("result: " + result)
//   web3.eth.getBalance(result).then(result => {
//     console.log("balance: " + result);
//   })
// })
global.bopContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
// console.log(web3.eth.getBalance(web3.eth.coinbase));
