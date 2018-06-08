//@flow
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
}
from 'react-native';

export default class CommonHeader extends Component {
    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.textview}>
                        <Text style={styles.textstyle}>{this.props.text || "标题头"}</Text>
                    </View>
                </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        alignSelf: 'stretch',
        backgroundColor: '#212121',
        marginTop: 20,
    },
    textview: {
        flex: 1,
        alignSelf: 'center',
    },
    textstyle: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
});
