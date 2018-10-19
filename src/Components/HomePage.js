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
