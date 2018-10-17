import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, CardSection, BackgroundImage } from './common';
import MapView from 'react-native-maps';

class SecondPage extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const city = navigation.getParam('data', []);
      return {
        title: city.name,
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
      };
    };


  render() {
    const { navigation } = this.props;
    const city = navigation.getParam('data', []);
    const { name, url, description } = city;
    const {
      upperSectionStyle,
      lowerSectionStyle,
      CityNameStyle
    } = styles;
    return (
      <View>
        <View style={upperSectionStyle} >
          <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          />
        </View>

        <ScrollView style={lowerSectionStyle}>
          <Text>{ description }</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  upperSectionStyle: {
    height: '30%',
    backgroundColor: '#000'
  },
  lowerSectionStyle: {
    height: '70%'
  },
  CityNameStyle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold'

  }
};

export default SecondPage;
