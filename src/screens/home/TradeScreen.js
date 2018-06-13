/* @flow */
import React, {
  Component
}
from 'react';
import {
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
}
from 'react-native';
import * as Keychain from 'react-native-keychain';
import {VictoryAxis, VictoryContainer, VictoryLine, VictoryChart, VictoryTheme} from "victory-native";
import ScrollableItemsGroup from '../../component/ScrollableItemsGroup';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {storage} from '../../config/storage';
import { SERVER_ADDRESS } from '../../config/constants/config';
import {wallet} from '../../eth/wallet';
import FIFORing from '../../utils/FixedFIFOArray';
// import {getPrivateKey, createAccountInRandomBuffer} from './../../eth/wallet';

// const data = new FIFORing([], 20);

// [  { quarter: 7, earnings: 17000 },
//   { quarter: 4, earnings: 19000 },
//   { quarter: 6, earnings: 15000 },
//   { quarter: 1, earnings: 17000 },
//   { quarter: 5, earnings: 12000 },
//   { quarter: 2, earnings: 16500 },
//   { quarter: 3, earnings: 14250 },]

type Props = {};

type State = {
  amount: number,
  marketData: Array<Object>,
  dataTickValues: Array<Object>,
  coinType: number,
  coinMap: {string: number},
  timeType: number,
  timeMap: {string: number},
  selectedIndex: number,
}

export default class TradeScreen extends Component <Props, State> {
  static navigationOptions = ({ navigation}) => {
    return {
      headerRight:
      <SimpleLineIcons
        name='question'
        size={25}
        color='white'
        style={{paddingRight: 18}}
        onPress={() => {navigation.navigate('HelpTrade')}}
      />,
    }
  };

  sourceData = new FIFORing([], 20)
  index: number = 1
  dataSource:IntervalID

  state = {
    amount: 0,
    selectedIndex: 0,
    coinType: 0,
    coinMap: new Map([
      ['BTC', 0],
      ['ETH', 1],
      ['LTC', 2],
    ]),
    timeType: 30,
    timeMap: new Map([
      ['30', 30],
      ['60', 60],
      ['300',300],
    ]),
    marketData: [],
    dataTickValues: [],
  }

  componentDidMount = () => {
    // console.log('componentDidMount');
    this.dataSource = setInterval(this.getMarketData, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.dataSource);
  }

  getMarketData = () => {
    this.sourceData.push({time: (new Date()).getTime(), price: 10000+Math.ceil(Math.random() * 10000)})
    this.setState({marketData: this.sourceData.getArrayCopy()})
    let arr = []
    let index = 0
    while (index < this.sourceData.list.length) {
      arr.push(this.sourceData.list[index].time)
      index+=4
    }
    this.setState({dataTickValues: arr})
  }


  closeDataSource = () => {
    clearInterval(this.dataSource)
  }

  changeCoinType = (keyStr: string) => {
    this.setState({coinType: this.state.coinMap.get(keyStr)})
  }

  getCurrentCoinTypeName = () => {
    for (let [key, value] of this.state.coinMap) {
      if (value == this.state.coinType) {
        return key
      }
    }
  }

  getTimeFromTimeStamp = (timeStamp: number) => {
    return (new Date(timeStamp)).toTimeString().split(' ')[0]
  }

  changeTimeType = (keyStr: string) => {
    this.setState({timeType: this.state.timeMap.get(keyStr)})
  }


 //  sendRequest = async() => {
 //    var response = await fetch(SERVER_ADDRESS + '/users', {credentials: 'same-origin'})
 //    // console.log(Fetch);
 //  }
 //
 //  getcookie = async() => {
 //    var response = await fetch(SERVER_ADDRESS, {credentials: 'same-origin'})
 //    console.log(response);
 //  }
 //
 //  postSign = async() => {
 //    var nonce = await fetch(SERVER_ADDRESS+'/users/getnonce', {credentials: 'same-origin'})
 //    var tt = await nonce.json()
 //    console.log(tt);
 //    var send = JSON.stringify(wallet.signData(tt.nonce))
 //    console.log(send);
 //    // nonce.json().then(data => {console.log(data)})
 //    // console.log((await nonce.body.getReader().read()));
 //    // console.log();
 //    await fetch(SERVER_ADDRESS+'/users/post', {
 //      headers: {
 //   　　　　 'Accept': 'application/json',
 //   　　　　 'Content-Type': 'application/json',
 // 　　　　 },
 //      credentials: 'same-origin',
 //      method: 'post',
 //      body: send,
 //    })
 //  }

  render() {
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.noteView}>
          <Text style={{fontSize: 16, color: '#EDB000'}}>{this.getCurrentCoinTypeName()}</Text>
        </View>
        <ScrollableItemsGroup pressOnKey={this.changeCoinType} items={[...this.state.coinMap.keys()]}/>
        <ScrollableItemsGroup pressOnKey={this.changeTimeType} items={[...this.state.timeMap.keys()]}/>
        <View style={styles.chartHeaderView}>
          <View style={{flexDirection: 'row',}}>
            <SimpleLineIcons name='clock' size={14} color='#FDE400' onPress={this.closeDataSource}/>
            <Text style={styles.timeText}>{this.state.marketData.length > 0 ?
              this.getTimeFromTimeStamp(this.state.marketData[this.state.marketData.length-1].time)
            :
              '0'
            }</Text>
          </View>
          {this.state.marketData.length>1 && (
            <View style={styles.trendIndicateView}>
              <Entypo
                name={this.state.marketData[this.state.marketData.length-1].price > this.state.marketData[this.state.marketData.length-2].price?
                'chevron-up': 'chevron-down'}
                color={this.state.marketData[this.state.marketData.length-1].price > this.state.marketData[this.state.marketData.length-2].price?
                '#8BC34A':'#FF5C00'}
                size={20}
              />
              <Text style={{color: '#FDE400'}}>{this.state.marketData[this.state.marketData.length-1].price}</Text>
            </View>
          )}
        </View>

        <View style={styles.chartAreaView}>
          <VictoryChart
            height={200}
            width={350}
            padding={{left: 50, right: 10, top: 20, bottom: 25}}
            containerComponent={
              <VictoryContainer
                style={{
                    backgroundColor: '#353535',
                }}
              />
            }
            theme={VictoryTheme.material}
          >
            <VictoryAxis
              style={{
                grid: {stroke: 'none'},
                tickLabels: {padding: 1, fill:'#ffffff'},
              }}
              tickValues={ this.state.dataTickValues.length > 4 ? this.state.dataTickValues : [this.state.dataTickValues[0] ? this.state.dataTickValues[0]: 0]}
              tickFormat={(t) => this.getTimeFromTimeStamp(t)}
            />
            <VictoryAxis
              dependentAxis
              style={{
                grid: {stroke: 'white'},
                tickLabels: {padding: 5, fill:'#ffffff'},
              }}
            />
            {this.state.marketData.length > 1 && (<VictoryLine
              style={{
                data: { stroke: "#fc8100", size: 6 },
              }}
              x="time"
              y="price"
              data={this.state.marketData} />
            )}
          </VictoryChart>
        </View>
        <View style={styles.amountInputAreaView}>
          <MaterialCommunityIcons
            name='coin'
            size={16}
            color='white'
          />
          <TextInput
            keyboardType='numeric'
            style={styles.amountInput}
            onChangeText={(amount) => {this.setState({amount})}}/>
        </View>
      </View>
    </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#212121',
    // justifyContent: 'center',
  },
  noteView: {
    backgroundColor: '#0E0E0E',
    height: 45,
    justifyContent: 'center',
  },
  buttonGroupContainer: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartHeaderView: {
    width:350,
    height: 39,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    marginLeft: 5,
    color: '#FDE400',
    fontSize: 14,
  },
  trendIndicateView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  amountInputAreaView: {
    backgroundColor: '#363636',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    width: 360,
    height: 40,
    marginTop: 15,
    paddingLeft: 17,
  },
  amountInput: {
    fontSize: 16,
    flex: 1,
    color: 'white',
  },
  chartAreaView: {
    width:360,
    alignSelf: 'center',
    // paddingLeft: 21,
    // paddingRight: 21,
  },
  textInput:{
    fontSize: 14,
  },
  edit: {
    marginTop: 30,
    height:40,
    fontSize:20,
    backgroundColor: '#fff',
  },
})

// <Button title = "login"
//  onPress = {this.getcookie}/>
//  <Button title = "send"
//    onPress = {this.sendRequest}/>
  // <Button title = "sign"
  //   onPress = {this.postSign}/>
  // <Button title = "clear data"
  //   onPress = {
  //     () => {
  //       storage.remove({
  //         key: 'currentUser',
  //       });
  //       Keychain.resetInternetCredentials('BOP.account.' + wallet.account.address)
  //       this.props.navigation.navigate('AuthLoading');
  //       /* 1. Navigate to the Details route with params */
  //       // this.props.navigation.navigate('Auth');
      // }
    // }
  // />
