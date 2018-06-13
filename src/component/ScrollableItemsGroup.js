//@flow
import React, {Component} from 'react'
import {
  Alert,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native'
import {ButtonGroup} from 'react-native-elements';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

type Props = {
  pressOnKey: Function,
  items: [string],
}

type State = {
  selectedIndex:number
}

export default class ScrollableItemsGroup extends React.Component<Props, State> {
  // static defaultProps = {
  //   pressOnKey : () => {
  //     Alert.alert('加载中，请稍后')
  //   },
  //   items:['获取中'],
  // };

  state = {
    selectedIndex: 0,
  }

  updateIndex = (selectedIndex: number) => {
    this.setState({selectedIndex})
    this.props.pressOnKey(this.props.items[selectedIndex])
  }

  render() {
    return (
      <View style={styles.buttonGroupContainer}>
        <SimpleLineIcons
          name='arrow-left'
          size={20}
          color='#888888'
          style={{paddingLeft: 10, paddingRight: 10}}
        />
        <ScrollView horizontal={true}
          style={{height: 28}}
          showsHorizontalScrollIndicator={false}
          overScrollMode='never'
        >
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={this.state.selectedIndex}
            buttons={this.props.items}
            containerStyle={{height:28,marginTop:0, marginLeft:0, marginRight: 0, borderColor:'#333333', backgroundColor: '#333333'}}
            buttonStyle={{backgroundColor: '#212121', width:73, height: 28,justifyContent: 'center', alignItems: 'center'}}
            textStyle={{color: '#DDDDDD', fontSize: 12}}
            selectedButtonStyle={{backgroundColor: '#EDB000'}}
            selectedTextStyle={{color: '#212121' }}
            innerBorderStyle={{color: '#333333', width: 6}}
            containerBorderRadius={3}
          />
        </ScrollView>
        <SimpleLineIcons
          name='arrow-right'
          size={20}
          color='#888888'
          style={{paddingLeft: 10, paddingRight: 10}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonGroupContainer: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
})
