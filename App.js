/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import './src/config/storage';
import './src/config/eth';

import AppTab from './src/navigations/AppTab';
import AuthSwitch from './src/navigations/AuthSwitch';
import React, {Component} from 'react';
import { createSwitchNavigator } from 'react-navigation';

const RootSwitch = createSwitchNavigator(
  {
    Auth: AuthSwitch,
    App: AppTab,
  },
  {
    initialRouteName: 'Auth',
    mode: 'modal',
  }
);

export default class App extends React.Component {
  render() {
    return <RootSwitch />;
  }
}
