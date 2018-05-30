// @flow
import React, {Component} from 'react';
import {
  Alert,
  Button,
  Text,
  View
} from 'react-native';
import PendingTransaction from './../../component/PendingTransaction'

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '0',
      gaslimit: 0,
      gasprice: 0,
      reulst: null,
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Details',
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Info"
          color="#fff"
        />
      ),
    }
  };
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
        <PendingTransaction method='createItem' params={['1000','1', '17000', '17000',]} pk='0x96f7a140cad880f2b729d873e85e50a8f345df5fef840a862c4b0f1686cbd6f1' transactionDidSend={() => {Alert.alert('发送成功', '交易发送成功，等待确认')}}></PendingTransaction>
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
