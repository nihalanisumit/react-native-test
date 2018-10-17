import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Card, CardSection, BackgroundImage } from './common';


const CityCardView = ({ city, navigation }) => {
  const { name, url, description } = city;
  const {
    upperSectionStyle,
    lowerSectionStyle,
    CityNameStyle
  } = styles;

  return (
    <Card>
    <TouchableOpacity onPress={() => navigation.navigate('DetailsPage', { data: city })} >
      <CardSection>
        <View style={upperSectionStyle} >
              <BackgroundImage
               resizeMode="cover"
               opacity={0.5}
               source={url}
              />
              <View>
                <Text style={CityNameStyle}> { name.toUpperCase() } </Text>
              </View>
        </View>
      </CardSection>
      </TouchableOpacity>

      <CardSection>
        <ScrollView style={lowerSectionStyle}>
          <Text>{ description }</Text>
        </ScrollView>
      </CardSection>
    </Card>
  );
};

const styles = {
  upperSectionStyle: {
    height: 150,
    width: null,
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000'
  },
  lowerSectionStyle: {
    height: 100
  },
  CityNameStyle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold'

  }
};

export default CityCardView;
