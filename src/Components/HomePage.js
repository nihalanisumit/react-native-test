import React, { Component } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { List, SearchBar } from 'react-native-elements';
import CityCardView from './CityCardView';
import Data from './Data.js';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: Data,
      error: null,
    };

    this.cityHolder = Data;
  }

  static navigationOptions = ({ navigation }) => {
      return {
        title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
      };
  };

  componentDidMount() {
  }

  searchFilterFunction = text => {
    const newData = this.cityHolder.filter(item => {
      const cityName = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      const placesData = item.places
      let placeExistInTheCity = false
      for (const place of placesData) {
        const placeName = place.name.toUpperCase();
        if (placeName.indexOf(textData) > -1){
          placeExistInTheCity = true
        }
      }
      return (cityName.indexOf(textData) > -1 || placeExistInTheCity)
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search Cities..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <CityCardView key={item.id} city={item} navigation={this.props.navigation} />
            )}
            keyExtractor={item => item.id}
            ListHeaderComponent={this.renderHeader}
          />
        </List>
      </SafeAreaView>
    );
  }
}

export default HomePage;
