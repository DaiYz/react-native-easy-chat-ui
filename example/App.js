import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Navigator from './src/navigator';

export default class App extends Component<Props> {
  render() {
    return (
      <View style={{flex: 1}}>
        <Navigator />
      </View>
    );
  }
}
