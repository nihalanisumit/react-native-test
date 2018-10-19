import React from 'react';
import { View,Text,Image,Button } from 'react-native';

const Places = (props) => {
  console.log('inside places, data is ' + JSON.stringify(props.city) );
  return (
    <View >
      <View style={styles.firstLineStyle}>
        <Text> {props.city.places[0].name} </Text>
        <Text>1.2 km </Text>
      </View>
      <View>
        <Text> long textttt</Text>
      </View>
      <View style={styles.buttonContainerStyle}>
        <Button title="Direction" color="#841584"/>
        <Button title="Book Uber" color="#841584"/>
      </View>
      <View style={styles.imageContainerStyle}>
        <Image style={styles.imageStyle} source={{uri: 'https://www.tourmyindia.com/images/hawa-mahal-fort-jaipur3.jpg'}} />
        <Image style={styles.imageStyle} source={{uri: 'https://www.tourmyindia.com/images/hawa-mahal-fort-jaipur3.jpg'}} />
        <Image style={styles.imageStyle} source={{uri: 'https://www.tourmyindia.com/images/hawa-mahal-fort-jaipur3.jpg'}} />
      </View>
    </View>
  );
};

const styles = {
  firstLineStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  imageContainerStyle:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  imageStyle: {
    height: 50,
    width: 50
  }
};

export default Places;
