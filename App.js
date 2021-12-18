import React, {Component} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Routes from './src/Routes';

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#1C3131" barStyle="light-content" />
        <Routes />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
