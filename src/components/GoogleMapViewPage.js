import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import marker from '../assets/images/marker.png';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

class GoogleMapViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitudeDelta,
        longitudeDelta,
        latitude: this.props.latitude,
        longitude: this.props.longitude,
      },
    };

    console.log('FromAddress');
    console.log(this.props.latitude);
    console.log(this.props.longitude);
    console.log('FromAddress');
  }

  onRegionChange = region => {
    this.setState({
      region,
    });
  };

  handleMapClick = () => {
    console.log(
      'FromMapView' +
        this.state.region.latitude +
        ' -- ' +
        this.state.region.longitude,
    );
    this.props.onConfirmLocationClickCallback(
      this.state.region.latitude,
      this.state.region.longitude,
    );
  };

  render() {
    const {region} = this.state;
    return (
      <View style={styles.map}>
        <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={this.onRegionChange}
        />
        <View style={styles.markerFixed}>
          <Image style={styles.marker} source={marker} />
        </View>
        <SafeAreaView style={styles.footer}>
          <TouchableOpacity
            onPress={this.handleMapClick}
            style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Confirm Location</Text>
          </TouchableOpacity>
          {/* <Text style={styles.region}>{JSON.stringify(region, null, 2)}</Text> */}
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 48,
    width: 48,
  },
  footer: {
    backgroundColor: 'transparent',
    bottom: 25,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
  buttonStyle: {
    marginTop: 20,
    justifyContent: 'center',
    backgroundColor: '#525151',
    width: '90%',
    height: 39,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'OpenSans-Regular',
  },
});

export default GoogleMapViewPage;
