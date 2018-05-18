

createAccountInRandomBuffer = (password: string) => {
    let account = web3.eth.accounts.create(web3.utils.randomHex(32));
    console.log(account);
    storage.save({
      key: 'eth.account',
      id: account.address,
      data: web3.eth.accounts.encrypt(account.privateKey, password),
      expires: null,
    })
    return account.address;
  }

importAccountFromPrivateKey = (pk: string) => {
  storage.save({
    key: 'eth.account',
    id: account.address,
    data: web3.eth.accounts.encrypt(pk, password),
    expires: null,
  })
}

getPrivateKey = async(address: string, password:string) => {
    var keystone = {}
    try {
      keystone = await storage.load({
        key: 'eth.account',
        id: address,
      })
    } catch (e) {
      console.log(e);
    }
    return web3.eth.accounts.decrypt(keystone, password).privateKey
}
export {
  createAccountInRandomBuffer,
  importAccountFromPrivateKey,
  getPrivateKey,
}
