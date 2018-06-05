//@flow
import {web3} from './../config/eth'
import * as bip39 from 'bip39'
import HDKey from 'hdkey'

type Account = {
  address: string,
  privateKey: string,
  signTransaction: Function,
  sign:Function,
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
    var keystore = this.importAccountFromMnemonic(mnemonic, password, language)
    return {mnemonic, keystore}
  }

  createAccountInRandomBuffer = () => {
    this.account = web3.eth.accounts.create(web3.utils.randomHex(32))
    return this.account;
  }

  _generateKeystore = (password: string) => {
    return web3.eth.accounts.encrypt(this.account.privateKey, password)
  }

  importAccountFromMnemonic = (mnemonic: string, password:string, language: string ='english') => {
    if (bip39.validateMnemonic(mnemonic, bip39.wordlists[language])) {
      var privateKey = HDKey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic)).privateKey.toString('hex')
      console.log(privateKey);
      return this.importAccountFromPrivateKey(privateKey, password)
    } else {
      throw '无效助记词'
    }
  }

  importAccountFromKeyStore = async(keystore: string, password:string) => {
    console.log(keystore);
    var keystoreObj = JSON.parse(keystore)
    this.account = web3.eth.accounts.decrypt(keystoreObj, password)
  }

  importAccountFromPrivateKey = (privateKey: string, password: string) => {
    if (!privateKey.startsWith('0x')) {
      privateKey = '0x' + privateKey
    }
    this.account = web3.eth.accounts.privateKeyToAccount(privateKey)
    return this._generateKeystore(password)
  }

  signData = (data: string) => {
    return this.account.sign(data)
  }

}
const wallet = new Wallet()
export {
  wallet,
}
