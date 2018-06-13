/* @flow */
import React, {
  Component
}
from 'react';
import {
  StyleSheet,
  Text,
  View,
}
from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'

type Props = {};

type State = {
  password: string,
  address: string,
  memric: string,
}

export default class HelpScreen extends Component < Props, State > {
  static navigationOptions = ({ navigation}) => {
    return {
      title: 'Help',
    }
  };

  state = {
    password: '',
    address: '',
    memric: '',
  }

  componentDidMount = () => {
    console.log('HelpScreen componentDidMount');
  }

  componentWillUnmount = () => {
    console.log('HelpScreen componentWillUnmount');
  }

  componentWillReceiveProps = (
  nextProps: Props
) => {
  console.log('HelpScreen componentWillReceiveProps');
  console.log(nextProps);
}

  componentWillUpdate = (
    nextProps: Props,
    nextState: State,
    nextContext: any,
  ) => {
    console.log('HelpScreen componentWillUpdate');
    console.log(nextProps);
    console.log(nextState);
    console.log(nextContext);
  }

  componentDidUpdate = (
    prevProps: Props,
    prevState: State,
    prevContext: any,
  ) => {
    console.log('HelpScreen componentDidUpdate');
    console.log(prevProps);
    console.log(prevState);
    console.log(prevContext);
  }



  render() {
    return (
      <View style ={styles.container}>
        <Text>Helping</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
    // marginTop: 140,
  },
  textInput:{
    fontSize: 14,
    // width: 200,
    // height: 15,
  },
  edit: {
    marginTop: 30,
    height:40,
    fontSize:20,
    backgroundColor: '#fff',
  },
})
