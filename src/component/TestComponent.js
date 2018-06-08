//@flow
import React, {Component} from 'react'
import {
  Button,
  View,
  Text,
} from 'react-native'

type Props = {
  titop: bool,
  meanningless: string,
}

type State = {
  ddd: number,
  idjas:string,
}

export default class TestComponent extends React.Component<Props, State> {//生命周期测试
  componentDidMount = () => {
    console.log('TestComponent componentDidMount');
  }

  componentWillUnmount = () => {
    console.log('TestComponent componentWillUnmount');
  }

  componentWillReceiveProps = (
  nextProps: Props
) => {
  console.log('TestComponent componentWillReceiveProps');
  console.log(nextProps);
}

  componentWillUpdate = (
    nextProps: Props,
    nextState: State,
    nextContext: any,
  ) => {
    console.log('TestComponent componentWillUpdate');
    console.log(nextProps);
    console.log(nextState);
    console.log(nextContext);
  }

  componentDidUpdate = (
    prevProps: Props,
    prevState: State,
    prevContext: any,
  ) => {
    console.log('TestComponent componentDidUpdate');
    console.log(prevProps);
    console.log(prevState);
    console.log(prevContext);
  }

  render(){
    return (
      <View>
        <Text>{this.props.titop.toString()}</Text>
      </View>
    )
  }
}
