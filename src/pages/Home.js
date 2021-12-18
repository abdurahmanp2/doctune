import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
  Platform,
} from 'react-native';
import GoogleMapViewPage from '../components/GoogleMapViewPage';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {request, check, RESULTS, PERMISSIONS} from 'react-native-permissions';

export default Home = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [iconStatus, setIconStatus] = useState(true);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isMapViewFlag, setMapViewFlag] = useState(false);
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');

  const handleMapClick = async () => {
    try {
      setIconStatus(false);
      setIsLoading(true);

      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await check(permission);

      if (result === RESULTS.GRANTED) {
        // Permission Exists
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setMapViewFlag(true);
            setIsLoading(false);
          },
          error => {
            console.log(error.code, error.message);
            setIsLoading(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        // Request for permissions
        request(permission).then(result => {
          if (result === RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
              position => {
                console.log(position);
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setMapViewFlag(true);
                setIsLoading(false);
              },
              error => {
                console.log(error.code, error.message);
                setIsLoading(false);
              },

              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
          } else {
            Alert('Sorry, Unable to open Map');
            setIsLoading(false);
          }
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleConfirmLocationCallback = (selectedLat, selectedLong) => {
    console.log('FromAddressView' + selectedLat + ' -- ' + selectedLong);
    setLatitude(selectedLat);
    setLongitude(selectedLong);
    Geocoder.init('AIzaSyBJpNdoUrwdHNLUTqVcRgautvhsF103McE');
    Geocoder.from(selectedLat, selectedLong)
      .then(json => {
        var addressComponent = json.results[0].address_components;
        var formattedAddress = json.results[0].formatted_address;
        setArea(formattedAddress);
        setCity(addressComponent[1].long_name);
      })
      .catch(error => console.warn(error));
    setMapViewFlag(false);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit the App?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const logOut = async () =>
    Alert.alert('Confirm Logout', 'Are you sure want to Logout?', [
      {
        text: 'cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'ok', onPress: () => props.navigation.navigate('Login')},
    ]);
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{width: '10%'}} onPress={() => logOut()}>
            <Image
              style={{width: 25, height: 25}}
              resizeMode="contain"
              source={require('../assets/images/logout.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {!isMapViewFlag ? (
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>
            Welcome {props.navigation.getParam('userName')}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleMapClick()}>
            <Text style={styles.buttonText}>Find Location</Text>
          </TouchableOpacity>
           <Text>Current area is {city}</Text> 
        </View>
      ) : (
        <GoogleMapViewPage
          style={{flex: 1}}
          latitude={latitude}
          longitude={longitude}
          onConfirmLocationClickCallback={handleConfirmLocationCallback}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  headerContainer: {
    height: '10%',
    backgroundColor: '#1A3254',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
  },
  button: {
    width: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    marginVertical: 10,
    backgroundColor: '#1c3131',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    paddingVertical: 12,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '500',
    marginBottom: '30%',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
