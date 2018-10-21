import React from 'react';
import { View, Text, ScrollView, Platform, Linking } from 'react-native';
import { Card, Button, BackgroundImage } from './common';

const Places = (props) => {
  const { placeDetails, currentLatitude, currentLongitude } = props;
  const { lat, lon } = placeDetails.coordinates;
  console.log('inside places, data is ' + JSON.stringify(props.Places) );
  return (
      <Card>
        <View >
          <View style={styles.firstLineStyle}>
            <Text style={styles.placeTitleTextStyle}> {placeDetails.name} </Text>
            <Text style={styles.distanceTextStyle}>{calculateDistance(currentLatitude, currentLongitude, lat, lon)} Km </Text>
          </View>
          <ScrollView style={styles.descriptionContainerStyle} showsVerticalScrollIndicator>
            <Text style={styles.descriptionTextStyle}>
              {placeDetails.description}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.buttonContainerStyle}>
          <Button buttonText='Directions' iconURL='./commom/direction.png' onPress={ () => openDirections(placeDetails.name) }/>
          <Button buttonText='Book Uber' iconURL='./commom/taxi.png' onPress={() => bookUber(placeDetails.name) } />
        </View>
        <View style={styles.imageContainerStyle}>
          { renderImages(placeDetails.images) }
        </View>
      </Card>
  );
};

const renderImages = (images) => {
  return images.map(image =>
    <View style={styles.imageStyle} key={images.url}>
      <BackgroundImage
       resizeMode="cover"
       opacity={1.0}
       source={image.url}
      />
    </View>
  );
};


const calculateDistance = (lat1, lon1, lat2, lon2) => {
  console.log('current lat = ' + lat1 + ' current long =' + lon1 + 'city lat = ' + lat2 + ' city long =' + lon2);
  const radlat1 = Math.PI * lat1/180
  const radlat2 = Math.PI * lat2/180
  const theta = lon1-lon2
  const radtheta = Math.PI * (theta/180)
  let dist = (Math.sin(radlat1) * Math.sin(radlat2)) + (Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta));
  if (dist > 1){
    dist=1;
  }
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344
  return Math.round(dist)
};

const openDirections = (labelText) => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${this.lat},${this.lon}`;
  const label = labelText;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
  });
Linking.openURL(url);
};


const bookUber = (dropText) => {
  console.log('book uber button pressed');

  const url = 'https://m.uber.com/ul/?client_id=L6lwCHQCrv5ecZx51R7APYeN5utUYvb&action=setPickup&pickup[latitude]=${this.currentLatitude}&pickup[longitude]=${this.currentLongitude}&pickup[nickname]=my_location&dropoff[latitude]=${this.lat}&dropoff[longitude]=${this.lon}&dropoff[nickname]=${dropText}&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d';
  Linking.openURL(url);
};

const styles = {
  firstLineStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  placeTitleTextStyle:{
    fontSize: 20
  },
  distanceTextStyle:{
    alignSelf: 'flex-end',
    fontSize: 16
  },
  descriptionContainerStyle:{
    height: '40%',
    padding: 10
  },
  descriptionTextStyle:{
    fontStyle: 'italic',
    textAlign: 'justify'
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15
  },
  imageContainerStyle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15
  },
  imageStyle: {
    height: 70,
    width: 90
  }
};

export default Places;
