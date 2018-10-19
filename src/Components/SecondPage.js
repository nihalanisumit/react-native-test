import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import MapView from 'react-native-maps';
import Places from './Places';

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
    const currentLatitude = navigation.getParam('currentLat', 0);
    const currentLongitude = navigation.getParam('currentLong', 0);
    const cityLatitude = navigation.getParam('cityLat', 0);
    const cityLongitude = navigation.getParam('cityLong', 0);
    const { name, url, description } = city;
    const {
      upperSectionStyle,
      lowerSectionStyle,
      CityNameStyle
    } = styles;


    return (
      <SafeAreaView style={{flex: 1}}>
        <View>
          <View style={upperSectionStyle} >
          <MapView style={styles.map} initialRegion={{
           latitude:cityLatitude,
           longitude:cityLongitude,
           latitudeDelta: 1,
           longitudeDelta: 1
          }}>


          </MapView>
          </View>
          <View style={styles.lowerSectionStyle}>
            <Swiper>
              { this.renderPlaces() }
            </Swiper>
          </View>

        </View>
      </SafeAreaView>
    );
  }

  renderPlaces = () => {
    const city = this.props.navigation.getParam('data', []);
    const currentLatitude = this.props.navigation.getParam('currentLat', 0);
    const currentLongitude = this.props.navigation.getParam('currentLong', 0);
    return city.places.map(place =>
        <Places key={place.name} placeDetails={place} currentLatitude ={currentLatitude} currentLongitude={currentLongitude}/>
    );

  }
}

const styles = {
  upperSectionStyle: {
    height: '30%',
    backgroundColor: '#000'
  },
  lowerSectionStyle: {
    height: '70%',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10
  },
  CityNameStyle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold'

  }
};

export default SecondPage;
