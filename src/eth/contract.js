/* @flow */
import {CONTRACT_ABI, CONTRACT_ADDRESS} from './../config/constants/eth';
console.log(bopContract._address);
// console.log(crypto);
var data = bopContract.methods.setuinttttt(2333).encodeABI();
console.log(data);

var Tx = require('ethereumjs-tx');
var privateKey = new Buffer('78814d2a155910fe3d968934ee99427a5974bfa666f3a4a822f5300d1af735b6', 'hex')
var rawTx = {
  nonce: '0x5',
  gasPrice: '0x1',
  gasLimit: '0x16D37',
  to: bopContract._address,
  value: '0x00',
  data: data
}
var tx = new Tx(rawTx);
console.log(tx);
tx.sign(privateKey);
var serializedTx = tx.serialize();
console.log(serializedTx);
web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex')).on('transactionHash', function(hash){
    console.log(hash);
})
.on('receipt', function(receipt){
    console.log(receipt);
})
// .on('confirmation', function(confirmationNumber, receipt){ console.log(confirmationNumber + '  ' + receipt); })
.on('error', console.log);
