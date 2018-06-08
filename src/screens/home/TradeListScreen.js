// @flow
import React, {Component} from 'react';
import {
  Alert,
  Button,
  Text,
  TextInput,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PendingTransaction from './../../component/PendingTransaction'

export default class TradeListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '0',
      gaslimit: 0,
      gasprice: '0',
      reulst: null,
    }
  }
  static navigationOptions = {
      title: 'TradeList',
      tabBarIcon: ({focused, tintColor}) => (
        <Icon name="md-list-box" size={focused? 35: 25} color={tintColor} />
      ),
  };
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: 'Details',
  //     headerLeft: (
  //       <Button
  //         onPress={() => navigation.navigate('Trade')}
  //         title="Info"
  //         color="#fff"
  //       />
  //     ),
  //   }
  // };
  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      </View>
    );
  }

  // formData = () => {
  //   this.setState({data: generateData('setuinttttt', 341234)})
  // }
  //
  // estimatingGas = async() => {
  //   this.setState({gaslimit: await getGasLimit(this.state.data)})
  // }
  //
  // lookGasPrice = async() => {
  //   price = await getGasPrice();
  //   console.log("price: " + price);
  //   this.setState({gasprice: await getGasPrice()})
  // }

  // import { generateData } from './../eth/contract';
  //
  // console.log(generateData('test(uint256,uint256,uint256)', 33, 42, 6));
}
