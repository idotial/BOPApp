// @flow
import React, {Component} from 'react';
import {
  Alert,
  Clipboard,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PendingTransaction from './../../component/PendingTransaction'
import {wallet} from '../../eth/wallet';
import I18n from '../../i18n/i18n';

type State = {

};

type Props = {

}

const {height, width} = Dimensions.get('window')

export default class ExportKeystoreScreen extends Component {
  static navigationOptions = ({ navigation}) => {
    return {
      title: I18n.t('setting.exportKeystore')
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nodeView}>
          <Text style={styles.noteText}>{I18n.t('setting.offlineSave')}</Text>
          <Text style={styles.noteDescText}>{I18n.t('setting.offlineSaveDesc')}</Text>
        </View>
        <View style={styles.nodeView}>
          <Text style={styles.noteText}>{I18n.t('setting.noUseNet')}</Text>
          <Text style={styles.noteDescText}>{I18n.t('setting.noUseNetDesc')}</Text>
        </View>
        <View style={styles.nodeView}>
          <Text style={styles.noteText}>{I18n.t('setting.psdSaveSafe')}</Text>
          <Text style={styles.noteDescText}>{I18n.t('setting.psdSaveSafeDesc')}</Text>
        </View>
        <View style={styles.nodeView}>
          <Text style={styles.noteText}>{I18n.t('setting.noScreenshots')}</Text>
          <Text style={styles.noteDescText}>{I18n.t('setting.noScreenshotsDesc')}</Text>
        </View>
        <ScrollView
          centerContent
          indicatorStyle='white'
          contentContainerStyle ={styles.keystoreContainer}
        >
          <TextInput style={styles.keystoreText}
            multiline={true}
            editable={false}
            value={this.props.navigation.state.params.keystore}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#212121',
  },
  nodeView: {
    alignSelf: 'flex-start',
    paddingTop: 10,
  },
  noteText: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  noteDescText: {
    marginTop: 5,
    color: '#cccccc'
  },
  keystoreContainer: {
    height: height*0.3,
    width: width * 0.9,
    backgroundColor: '#363636',
    padding: 10
  },
  keystoreText: {
    fontSize: 15,
    color: '#FFBD00',
  },
  buttonStyle: {
    backgroundColor: '#363636',
  }
})
