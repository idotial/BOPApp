/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import './src/config/storage';
import './src/config/eth';

import AppTab from './src/screens/AppTab';
import AuthSwitch from './src/screens/AuthSwitch';
import ModalScreen from './src/screens/Modal';
import React, {Component} from 'react';
import { createSwitchNavigator } from 'react-navigation';

const RootStack = createSwitchNavigator(
  {
    Auth: AuthSwitch,
    App: AppTab,
    MyModal: ModalScreen,
  },
  {
    initialRouteName: 'Auth',
    mode: 'modal',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
