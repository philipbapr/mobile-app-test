import * as React from 'react';
import { Appbar, Button } from 'react-native-paper';
import { StyleSheet, Image, View, Text } from 'react-native';
import Logo from './assets/logo.png';
import { connect } from 'react-redux';

class MyComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }

  render() {
    const image = this.props.navigation.getParam('images') ? this.props.navigation.getParam('images') : '';
    return (
      <View>
        <Appbar.Header style={styles.headerStyle}>
          <Appbar.Content>
          </Appbar.Content>

          <Appbar.Action icon="archive" onPress={() => this.props.navigation.navigate('Camera')} />
          <Appbar.Action icon="label" onPress={() => this.props.navigation.navigate('CameraRoll')} />
          <Appbar.Action icon="map-search" onPress={() => this.props.navigation.navigate('Maps')} />
          <Appbar.Action icon="map-search" onPress={() => this.props.navigation.navigate('Form')} />
          <Appbar.Action icon="archive" onPress={() => this.props.navigation.navigate('Success')} />
          <Appbar.Action icon="label" onPress={() => this.props.navigation.navigate('History')} />

        </Appbar.Header>
        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <View>
            <Image style={{ height: 200, width: 200 }} source={Logo} resizeMode='contain' />
          </View>
          <View>
            <Button icon="camera" mode="contained" onPress={() => this.props.navigation.navigate('CameraRoll')}>
              Pilih Gambar
            </Button>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  headerStyle: {
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => ({
  ...state,
  photos: state.photos,
});

export default connect(mapStateToProps)(MyComponent);