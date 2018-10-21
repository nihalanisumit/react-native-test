/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomePage from './src/Components/HomePage';
import SecondPage from './src/Components/SecondPage';


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
