import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import colors from '../../components/styles/colors';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../../backend/hooks/useAuth';
import {ToastAndroid} from 'react-native';

const RequestType = (props: any) => {
  const {user} = useAuth();
  const [requestType, setRequestType] = useState('');
  const slideAnimation = useRef(new Animated.Value(1)).current;

  const handleNext = async () => {
      console.log('Pushing user Type to firebase');
    props.navigation.navigate('RequestPage', {
        requestType:requestType,
      });

    // await firestore()
    //   .collection('users')
    //   .doc(user?.uid)
    //   .set({userType: userType}, {merge: true})
    //   .then(() => {
    //     ToastAndroid.show('Wohoo!!', ToastAndroid.SHORT);
    //     props.navigation.navigate('Location');
    //   });
  };

  const handleSelection = (selectedType: string) => {
    setRequestType(selectedType);
    slideAnimation.setValue(0);

    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 250, // You can adjust the animation duration
      useNativeDriver: true,
    }).start();
  };
  let selectedImage = null;

  if (requestType === 'Sell') {
    selectedImage = require('../../components/assets/seller.png');
  } else if (requestType === 'Request') {
    selectedImage = require('../../components/assets/request.png');
  }
  const animatedStyle = {
    transform: [
      {
        translateX: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0], // Adjust the range for desired animation distance
        }),
      },
    ],
  };
  return (
    <View

      style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Image
          source={require('../../components/assets/backIcon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      {requestType ? (
        <View style={styles.imageContainer}>
          <Animated.View style={[styles.userImageContainer, animatedStyle]}>
            {selectedImage && (
              <Image
                source={selectedImage}
                style={styles.userImage}
                resizeMode="contain"
              />
            )}
          </Animated.View>
        </View>
      ) : null}
      <View style={{marginVertical: 20}}>
        <Text style={styles.subtitle}>Request Type Selection ...</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.userTypeOption,
          requestType === 'Sell' && styles.selectedOption,
        ]}
        onPress={() => handleSelection('Sell')}>
        <Text style={styles.optionText}>Sell an Item</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.userTypeOption,
          requestType === 'Request' && styles.selectedOption,
        ]}
        onPress={() => handleSelection('Request')}>
        <Text style={styles.optionText}>Request for an Item</Text>
      </TouchableOpacity>
      <View style={styles.nextButtonView}>
        <TouchableOpacity
          style={styles.nextButton}
          disabled={!requestType}
          onPress={handleNext}>
          <Image
            source={require('../../components/assets/next.png')}
            style={styles.nextIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#77e0f2',
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
  backIcon: {
    height: 30,
    width: 30,
    marginLeft: 15,
    paddingBottom: 15,
    marginTop: 15,
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
      borderWidth: 1,
      borderColor:colors.BLACK
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

export default RequestType;
