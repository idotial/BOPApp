/* @flow */
import
React,
{Component}
from 'react';
import {
  Alert,
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
import {CheckBox, Button} from 'react-native-elements';
import {storage} from '../../config/storage';
import {serverConnection} from '../../config/ServerConnection';
import {wallet} from '../../eth/wallet';
import FIFORing from '../../utils/FixedFIFOArray';

type Props = {};

type State = {
  amount: number,
  marketData: Array<Object>,
  dataTickValues: Array<Object>,
  coinType: number,
  coinMap: {string: number},
  timeType: number,
  timeMap: {string: number},
  // payOutMap:{number: {number: number}},
  selectedTrend: number,
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
    selectedTrend: 0,
    coinType: 0,
    coinMap: new Map([
      ['BTC/USD', 0],
      ['ETH/USD', 1],
      ['LTC/USD', 2],
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

  makeBet = () => {
    if(this.state.amount && this.state.selectedTrend) {
      return Alert.alert('send bet', this.state.coinType+' '+this.state.timeType+' '+this.state.amount+' '+this.state.selectedTrend)
    }
    return Alert.alert('send fall')
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
            {this.state.dataTickValues.length > 1 && (
              <VictoryAxis
                style={{
                  grid: {stroke: 'none'},
                  tickLabels: {padding: 1, fill:'#ffffff'},
                }}
                tickValues={ this.state.dataTickValues.length > 4 ? this.state.dataTickValues : [this.state.dataTickValues[0] ? this.state.dataTickValues[0]: 0]}
                tickFormat={(t) => this.getTimeFromTimeStamp(t)}
              />
            )}
            {this.state.marketData.length > 1 && (
              <VictoryAxis
                dependentAxis
                style={{
                  grid: {stroke: 'white'},
                  tickLabels: {padding: 1, fill:'#ffffff'},
                }}
              />
            )}
            {this.state.marketData.length > 1 && (
              <VictoryLine
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
        <View style={styles.bottomButtonsArea}>
          <View style={styles.checkBoxAreaView}>
            <CheckBox
              center
              title='height'
              containerStyle = {[styles.checkBoxContainer, styles.backgroundColorGreen]}
              checked={this.state.selectedTrend==1}
              onPress={() => this.setState({selectedTrend: 1})}
            />
            <CheckBox
              center
              title='low'
              containerStyle = {[styles.checkBoxContainer, styles.backgroundColorOrange]}
              checked={this.state.selectedTrend==2}
              onPress={() => this.setState({selectedTrend: 2})}
            />
          </View>
          <View style={styles.investButtonContainer}>
            <Button
              buttonStyle={styles.investButton}
              component={{marginRight: 0}}
              title='invest'
              onPress={this.makeBet}
            />
          </View>
        </View>
        <Text style={styles.rightText}>
          <Text style={{color: '#FFFFFF'}}>Payout: </Text>
          <Text style={{color: '#FF5C00'}}>${
            this.state.amount && this.state.selectedTrend && (
              this.state.amount * 1.75
            )
          }</Text>
        </Text>
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
    height: 30,
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
    height: 30,
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
  chartAreaView: {
    width:360,
    alignSelf: 'center',
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
    fontSize: 17,
    paddingLeft: 4,
    paddingBottom: 2,
    flex: 1,
    color: 'white',
  },
  textInput:{
    fontSize: 14,
  },
  bottomButtonsArea: {
    width:360,
    height: 85,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  checkBoxAreaView: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingRight: 5,
  },
  checkBoxContainer: {
    margin: 0,
    marginLeft: 0,
    padding: 6
  },
  investButtonContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  investButton: {
    height: 83,
    backgroundColor:'#EDB000'
  },
  edit: {
    marginTop: 30,
    height:40,
    fontSize:20,
    backgroundColor: '#fff',
  },
  rightText: {
    marginTop: 10,
    alignSelf:'flex-end',
    width: 160,
    fontSize: 14,
  },
  backgroundColorGreen: {
    backgroundColor: '#8BC34A',
  },
  backgroundColorOrange: {
    backgroundColor: '#FF5C00',
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
