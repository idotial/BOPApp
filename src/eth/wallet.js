//@flow
import {web3} from './../config/eth'
import * as bip39 from 'bip39'
import HDKey from 'hdkey'

class Wallet {
  keystore: any

  createAccountWithMnemonic = (language: string = 'en') => {
    var mnemonic = ''
    if (language == 'zh') {
      mnemonic = bip39.generateMnemonic(null, null, bip39.wordlists.chinese_simplified) //判断是否中文相关支持
    } else {
      mnemonic = bip39.generateMnemonic()
    }
    var privateKey = this.importAccountFromMnemonic(mnemonic)
    return { privateKey, mnemonic }
  }

  createAccountInRandomBuffer = () => {
      return web3.eth.accounts.create(web3.utils.randomHex(32));
    }

  generateKeystore = (pk: string, password: string) => {
    this.keystore = web3.eth.accounts.encrypt(pk, password)
    return this.keystore
  }

  importAccountFromMnemonic = (mnemonic: string) => {
    if (bip39.validateMnemonic(mnemonic)) {
      return HDKey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic)).privateKey.toString('hex')
    } else {
      throw '无效助记词'
    }
  }

  getPrivateKey = async(address: string, password:string) => {
    return web3.eth.accounts.decrypt(this.keystore, password).privateKey
  }
}
const wallet = new Wallet()
export {
  wallet,
}
