import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { List, SearchBar } from 'react-native-elements';
import CityCardView from './CityCardView';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.cityHolder = [];
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
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = 'https://gist.githubusercontent.com/nihalanisumit/f3091075a863a5b322644e81fda2e8bb/raw/c0bd8e5409f18a68504a4218bee4045721f1f59d/cities.json';
    //https://gist.githubusercontent.com/nihalanisumit/f3091075a863a5b322644e81fda2e8bb/raw/915a775c3b6ec91736a2a971676c58e0e25b3f07/cities.json
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log('data received is..', res.data.cities);
        this.setState({
          data: res.data.cities,
          error: res.error || null,
          loading: false,
        });
        this.cityHolder = res.data.cities;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    console.log(this.cityHolder);
    const newData = this.cityHolder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
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
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <CityCardView key={item.id} city={item} navigation={this.props.navigation} />
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderHeader}
        />
      </List>
    );
  }
}

export default HomePage;
