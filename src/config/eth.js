var Web3 = require('web3');

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:7545'));
global.web3 = web3;
// console.log(web3.eth.coinbase);
// console.log(web3.eth.getBalance(web3.eth.coinbase));
