//@flow
class ServerConnection {
  cookieExpireAt: 
  _getRequest = async(url: string): Promise<any> => {
    var response = await fetch(url, {
      credentials: 'same-origin',
      method: 'get',
    })
    return response
  }

  _postRequest = async(url: string, data: string): Promise<any> => {
    var response = await fetch(url, {
      headers: {
   　　　　 'Accept': 'application/json',
   　　　　 'Content-Type': 'application/json',
 　　　},
      credentials: 'same-origin',
      method: 'post',
      body: data
    })
    return response
  }
}

var serverConnection = new ServerConnection()

export {
  serverConnection,
}
