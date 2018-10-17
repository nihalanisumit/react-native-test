//import the libraries for Component
import React from 'react';
import { Text, View } from 'react-native';

//make a Component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>

    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }
};

//make Component available to other parts of the app
export { Header };
