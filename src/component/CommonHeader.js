//@flow
import React, { Component } from 'react';
import { Header, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

type Props = {
  title: string,
  pressLeftButton: Function,
  pressRightButton: Function,
}

export default class CommonHeader extends React.Component<Props> {
  renderLeftIcon = () => {
    if (this.props.pressLeftButton) {
      return (
            <Icon
              name='md-arrow-back'
              size={25}
              color='white'
              onPress={this.props.pressLeftButton}
            />
          )
        }
      }

      renderRightIcon = () => {
        if (this.props.pressRightButton) {
          return (
            <SimpleLineIcons
              name='question'
              size={25}
              color='white'
              onPress={this.props.pressRightButton}
            />
          )
        }
      }


    render() {
        return (
                <Header
                  backgroundColor = '#212121'
                  leftComponent = { this.renderLeftIcon() }
                  centerComponent={{ text: 'Trade', style: { color: '#ffffff'}}}
                  rightComponent = { this.renderRightIcon() }
                />
                );
            }
}

// leftComponent={<Button
//   Icon={
//     name='md-arrow-back'
//     size={15}
//     color='white'
//   }
//   }
