import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';

const Button = (props) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={props.onPress}>

         {getIcon(props.buttonText)}

         <View style={styles.SeparatorLine} />

         <Text style={styles.TextStyle}> {props.buttonText} </Text>

       </TouchableOpacity>
  );
};

const getIcon = (text) => {
  if (text === 'Directions') {
    return(
      <Image
       style={styles.ImageIconStyle}
       source={ require('./images/direction.png') }
      />
    );
  }
  else{
    return(
      <Image
       style={styles.ImageIconStyle}
       source={ require('./images/taxi.png') }
      />
  );
  }

}

const styles = {
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4511e',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5 ,
    margin: 5,
  },
  ImageIconStyle: {
   padding: 10,
   margin: 5,
   height: 25,
   width: 25,
   resizeMode : 'stretch',

},
TextStyle : {
  color: '#fff',
  marginBottom: 4,
  fontSize: 14,
  paddingLeft: 10,
  paddingRight: 10
},
SeparatorLine :{
  backgroundColor : '#fff',
  width: 1,
  height: 40
}
};

export { Button };
