/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ImageBackground,
  Image,
  PermissionsAndroid,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import colors from '../../components/styles/colors';
import Geolocation from 'react-native-geolocation-service';
import {useAuth} from '../../backend/hooks/useAuth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Location = (props: any) => {
  const {user} = useAuth();
  const navigation = useNavigation();
  const [locationPermission, setlocationPermission] = useState(false);
  const [coordinates, setCoordinates] = useState();
  const [address, setAddress] = useState<string>('');
  const [newAddress, setnewAddress] = useState<string>('');
  const mapAnimation = new Animated.Value(0);

  const handleNext = async () => {
    console.log('Pushing location to firebase');
    const updatedData = {
      address: address,
      coordinates: coordinates,
    };

    if (newAddress) {
      updatedData.newAddress = newAddress;
    }
    await firestore()
      .collection('users')
      .doc(user?.uid)
      .set(updatedData, {merge: true})
      .then(async () => {
        ToastAndroid.show('Here we go!', ToastAndroid.SHORT);
        AsyncStorage.setItem('journey', 'completed');
        navigation.navigate('TabStack');
      });
  };

  useEffect(() => {
    requestLocationPermission();
    Animated.loop(
      Animated.sequence([
        Animated.timing(mapAnimation, {
          toValue: -5,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(mapAnimation, {
          toValue: 5,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  useEffect(() => {
    if (locationPermission) {
      Geolocation.getCurrentPosition(
        async position => {
          setCoordinates(position.coords);
          const {latitude, longitude} = position.coords;
          const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

          try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.address) {
              const formattedAddress = `${data.address.road || ''}, ${
                data.address.city || ''
              }, ${data.address.country || ''}`;
              setAddress(formattedAddress);
            } else {
              setAddress('Address not found');
            }
          } catch (error) {
            console.error('Error fetching address:', error);
            setAddress('Error fetching address');
          }
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [locationPermission]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'FarmFare needs access to your GPS ' +
            'so we can access your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setlocationPermission(true);
        console.log('You can use the Location');
      } else {
        setlocationPermission(false);
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <ImageBackground
      source={require('../../components/assets/loginBack.jpg')}
      style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            source={require('../../components/assets/backIcon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Animated.Image
            style={[styles.gif, {transform: [{translateY: mapAnimation}]}]}
            source={require('../../components/assets/location.png')}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 20, marginLeft: 15, color: colors.BLACK}}>
            Current Location :
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 50,
            marginTop: 20,
            borderColor: colors.BLACK,
            borderWidth: 1,
          }}>
          {address ? (
            <Text style={{fontSize: 20, color: 'black', flexWrap: 'wrap'}}>
              {address}
            </Text>
          ) : null}
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={{color: 'blue', padding: 10}}>
            In case above address isn't correct, Don't worry we got your exact
            coordinates
          </Text>
        </View>
        <View style={{marginTop: 1}}>
          <Text style={{fontSize: 17, marginLeft: 15, color: colors.RED}}>
            If you're not at your actual location, please mention your address
            along with area Pin Code.(else leave it blank)
          </Text>
        </View>
        <KeyboardAvoidingView>
          <View style={styles.inputWrapper2}>
            <TextInput
              placeholder="Enter your new Address"
              style={{
                color: colors.BLACK,
                marginVertical: 3,
                width: '80%',
                fontSize: 16,
                padding: 10,
              }}
              onChangeText={txt => setnewAddress(txt)}
              value={newAddress}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.nextButtonView}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              // Navigate to the appropriate screen based on userType
              handleNext();
            }}>
            <Image
              source={require('../../components/assets/next.png')}
              style={styles.nextIcon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.BLACK,
  },
  subtitle: {
    fontSize: 25,
    marginBottom: 20,
    color: colors.BLACK,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  userImageContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
  },
  backgroundImage: {
    resizeMode: 'cover',
    position: 'absolute',
    bottom: 0,
  },
  gif: {
    width: 200,
    height: 200,
  },
  backIcon: {
    height: 30,
    width: 30,
    marginLeft: 15,
    paddingBottom: 15,
    marginTop: 15,
  },
  inputWrapper2: {
    backgroundColor: colors.WHITE,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.BLACK,
    borderWidth: 1,
    alignSelf: 'center',
    paddingVertical: 2,
    borderRadius: 40,
    width: '99%',
  },
  nextButtonView: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginVertical: 20,
    marginRight: 20,
  },
  nextIcon: {
    height: 65,
    width: 65,
    marginLeft: 15,
    paddingBottom: 15,
    marginTop: 15,
  },
  userTypeOption: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 20,
    marginRight: 20,
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  selectedOption: {
    backgroundColor: '#61d64f',
  },
  optionText: {
    fontSize: 20,
    color: colors.BLACK,
    alignSelf: 'center',
  },
  nextButton: {
    marginTop: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  userImage: {
    width: 250,
    height: 250,
  },
});

export default Location;
