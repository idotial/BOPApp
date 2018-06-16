//@flow
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { wallet } from '../../eth/wallet';
import { SERVER_ADDRESS } from '../../config/constants/config';
import { storage } from '../../config/storage';
import * as Keychain from 'react-native-keychain';

// var {height, width} = Dimensions.get('window');

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this._bootstrapAsync()
  }

  sleep = (ms: number) =>{
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  _bootstrapAsync = async() => {
     if (wallet.isAlive()) {
       this.props.navigation.navigate('LoginSuccess');
     } else {
       // this.props.navigation.navigate('LoginSuccess');
       // this.props.navigation.navigate('Regist');
       try {
         await storage.load({
           key: 'currentUser',
         })
         this.props.navigation.navigate('Login')
       } catch (e) {
         this.props.navigation.navigate('Regist');
       }
     }
  };

  render() {
    return (
      <View>
        <Image
          resizeMode='cover'
          source={require('../../../asset/img/bj.png')}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.titleContainer}>
          <Text>
            <Text style={[styles.whiteText, styles.title]}>Block</Text>
            <Text style={[styles.yellowText, styles.title]}>option</Text>
          </Text>
          <Text style={styles.subTitle} >Superior smart trade expert</Text>
        </View>
        <ActivityIndicator style={{marginTop: 15}} animating={true} size="large"/>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  titleContainer: {
    marginTop: Dimensions.get('window').height * 0.3,
    alignSelf: 'center',
    alignItems: 'center',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  yellowText: {
    color: '#FFBD00',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 17,
    color: '#AAAAAA',
  },
})
