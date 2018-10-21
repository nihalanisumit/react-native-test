import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card, CardSection, BackgroundImage } from './common';

class CityCardView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      weatherCondition: '',
      temperature: 0,
      lat: 0,
      long: 0,
      currentLat: null,
      currentLong: null,
      error: null,
      locationError: null,
      iconColor: 'white'
    };

    this.cityHolder = [];
    this.navigation = props.navigation;
    this.city = props.city


  }

  componentDidMount() {
    this.makeRemoteRequest();
    this.makeGeoLocationRequest();
  }


  makeRemoteRequest = () => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city.name}&appid=86410776c14978582bf784cd529c7a48`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log('data received is..', res);
        this.setState({
          weatherCondition: res.weather[0].main,
          temperature: Math.round(res.main.temp - 273),
          lat: res.coord.lat,
          long: res.coord.lon,
          locationError: res.error || null,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  makeGeoLocationRequest = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          currentLat: position.coords.latitude,
          currentLong: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ locationError: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 360000 },
    );
  }



  render() {
    const { name, url, description, id } = this.props.city;
    const {
      upperSectionStyle,
      upperSectionLowerViewStyle,
      lowerSectionStyle,
      CityNameStyle,
      rightViewStyle,
      textStyle,
      descriptionTextStyle
    } = styles;

    return (
      <Card>
      <TouchableOpacity onPress={() => this.navigation.navigate('DetailsPage', {
        data: this.city,
        currentLat: this.state.currentLat,
        currentLong: this.state.currentLong,
        cityLat: this.state.lat,
        cityLong: this.state.long,
        iconColor: this.state.iconColor
       })} >
        <CardSection>
          <View style={upperSectionStyle} >
                <BackgroundImage
                 resizeMode="cover"
                 opacity={0.5}
                 source={url}
                />
                <View style={{alignSelf: 'flex-end'}}>
                  {this.renderFavouriteButton()}
                </View>
                <View style={upperSectionLowerViewStyle}>
                  <View style={{alignSelf: 'flex-end', padding: 3}}>
                    <Text style={CityNameStyle}> { name.toUpperCase() } </Text>
                  </View>

                  {this.renderWeatherDetails()}

                </View>

          </View>
        </CardSection>
        </TouchableOpacity>

        <CardSection>
          <ScrollView style={lowerSectionStyle}>
            <Text style={descriptionTextStyle}>{ description }</Text>
          </ScrollView>
        </CardSection>
      </Card>
    );
  }

  renderFavouriteButton = () => {
    return (
        <TouchableOpacity onPress={() => this.changeIconColor()}>
          <Icon name="favorite" color={this.state.iconColor}  size={30} />
        </TouchableOpacity>
    );
  };



  changeIconColor = () => {
    if (this.state.iconColor === 'red') {
      this.setState({ iconColor: 'white' });
    }
    if (this.state.iconColor === 'white') {
      this.setState({ iconColor: 'red' });
    }
  };

  renderWeatherDetails = () => {
    if (this.state.loading) {
      return (
        <View>
          <Text style={styles.textStyle}> </Text>
          <View style={{ flexDirection:'row'}}>
            <Text style={styles.textStyle}> </Text>
            <Image source={require('./common/images/arrow-point-to-right.png')} style={{height:16, width:16}}/>
          </View>
        </View>
      );
    }    else {

      console.log('conditions is ' + this.state.weatherCondition +' and temp = ' + this.state.temperature);
      return (
        <View style={{alignItems:'flex-end', paddingRight: 5, paddingBottom: 3}}>
          <Text style={styles.textStyle}> {this.state.temperature}°c {this.state.weatherCondition} </Text>
          <View style={{ flexDirection:'row'}}>
            {this.renderDistanceDetails()}
            <Image source={require('./common/images/arrow-point-to-right.png')} style={{height:16, width:16}}/>
          </View>
        </View>
      );
    }
  };

  renderDistanceDetails = () => {
    if (this.state.currentLat != null){
      return(
        <Text style={styles.textStyle}> {this.calculateDistance(this.state.currentLat,this.state.currentLong,this.state.lat,this.state.long)} km </Text>
      );
    }    else {
      <Text style={styles.textStyle}> -- </Text>
    }
  };

  calculateDistance = (lat1, lon1, lat2, lon2) => {
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

}


const styles = {
  upperSectionStyle: {
    height: 150,
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#000'
  },
  upperSectionLowerViewStyle:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  lowerSectionStyle: {
    height: 100
  },
  CityNameStyle: {
    fontSize: 22,
    color: '#fff',

  },
  rightViewStyle : {
    alignItems: 'flex-end',
    alignSelf: 'flex-end'
  },
  textStyle : {
    color: '#fff',
    fontSize: 16
  },
  descriptionTextStyle:{
    fontStyle: 'italic',
    textAlign: 'justify'
  }
};

export default CityCardView;
