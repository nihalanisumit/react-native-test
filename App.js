/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import HomePage from './src/Components/HomePage';
import SecondPage from './src/Components/SecondPage';
import { createStackNavigator } from 'react-navigation';


const RootStack = createStackNavigator(
  {
    Home: HomePage,
    DetailsPage: SecondPage,
  },
  {
    initialRouteName: 'Home',
  }
);


type Props = {};
export default class App extends Component<Props> {
  render() {
    return <RootStack />;
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
