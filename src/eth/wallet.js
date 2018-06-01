//@flow
import {web3} from './../config/eth'
import * as bip39 from 'bip39'
import HDKey from 'hdkey'

type Account = {
  address: string,
  privateKey: string,
}

class Wallet {
  account: Account

  isAlive = () => {
    if (this.account && this.account.privateKey) {
      return true
    }
    return false
  }

  createAccountWithMnemonic = (password: string, language: string = 'english') => {
    var mnemonic = bip39.generateMnemonic(null, null, bip39.wordlists[language]) //判断是否中文相关支持
    var privateKey = this.importAccountFromMnemonic(mnemonic, password, language)
    return mnemonic
  }

  createAccountInRandomBuffer = () => {
    this.account = web3.eth.accounts.create(web3.utils.randomHex(32))
    return this.account;
  }

  generateKeystore = (password: string) => {
    return web3.eth.accounts.encrypt(this.account.privateKey, password)
  }

  importAccountFromMnemonic = (mnemonic: string, password:string, language: string ='english') => {
    if (bip39.validateMnemonic(mnemonic, bip39.wordlists[language])) {
      var privateKey = HDKey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic)).privateKey.toString('hex')
      this.account = this._privateKeyToAccount(privateKey)
    } else {
      throw '无效助记词'
    }
  }

  switchAccount = async(keystore: string, password:string) => {
    var keystoreObj = JSON.parse(keystore)
    this.account = web3.eth.accounts.decrypt(keystoreObj, password)
    return this.account
  }

  _privateKeyToAccount = (privateKey: string) => {
    return web3.eth.accounts.privateKeyToAccount(privateKey)
  }
}
const wallet = new Wallet()
export {
  wallet,
}
