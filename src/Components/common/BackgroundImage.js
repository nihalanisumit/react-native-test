import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

class BackgroundImage extends React.Component {
//sample
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

render(){
  return (

    <View style={styles.container}>
      <Image
        style={[styles.image,
          { resizeMode: this.props.resizeMode,
          opacity: this.props.opacity }
        ]}
        source={{ uri: this.props.source }}
        onLoadStart={() => this.setState({ loading: true })}
        onLoadEnd={() => this.setState({ loading: false })}
      />
    {this.state.loading && <LoadingView />}
    </View>

  );
}

}

const LoadingView = () => {
        return (
            <View style={styles.LoaderContainer}>
                <ActivityIndicator size="small" color="#f4511e"/>
            </View>
        );
};


const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
  },
  LoaderContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.7,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    }
};

export { BackgroundImage };
