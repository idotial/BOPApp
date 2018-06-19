// @flow
import React, {Component} from 'react';
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import PendingTransaction from './../../component/PendingTransaction'

export default class TradeListScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    headerRight:
    <SimpleLineIcons
      name='question'
      size={25}
      color='white'
      style={{paddingRight: 18}}
      onPress={() => {navigation.navigate('HelpTrade')}}
    />,
  });

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#212121',
  },
})
