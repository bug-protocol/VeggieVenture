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
import firestore from '@react-native-firebase/firestore'
import { useAuth } from '../../backend/hooks/useAuth';
import { ToastAndroid } from 'react-native';

const ConsumerType = (props: any) => {
  const {user} = useAuth()
  const [userType, setUserType] = useState('Both');
  const slideAnimation = useRef(new Animated.Value(1)).current;

  const handleNext = async () => {
    console.log('Pushing user Type to firebase');



    await firestore()
      .collection('users')
      .doc(user?.uid)
      .set({userType:userType}, {merge: true})
      .then(() => {
        ToastAndroid.show('Wohoo!!', ToastAndroid.SHORT);
        props.navigation.navigate('Location');
      });
  };

  const handleSelection = (selectedType: string) => {
    setUserType(selectedType);
    slideAnimation.setValue(0);

    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 1000, // You can adjust the animation duration
      useNativeDriver: true,
    }).start();
  };
  let selectedImage = null;

  if (userType === 'Producer') {
    selectedImage = require('../../components/assets/farmer.png');
  } else if (userType === 'Consumer') {
    selectedImage = require('../../components/assets/healthfood.png');
  } else if (userType === 'Both') {
    selectedImage = require('../../components/assets/farmglobe.png');
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
    <ImageBackground
      source={require('../../components/assets/loginBack.jpg')}
      style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Image
          source={require('../../components/assets/backIcon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      {userType ? (
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
        <Text style={styles.subtitle}>How will you use the app?</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.userTypeOption,
          userType === 'Producer' && styles.selectedOption,
        ]}
        onPress={() => handleSelection('Producer')}>
        <Text style={styles.optionText}>I'm a Producer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.userTypeOption,
          userType === 'Consumer' && styles.selectedOption,
        ]}
        onPress={() => handleSelection('Consumer')}>
        <Text style={styles.optionText}>I'm a Consumer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.userTypeOption,
          userType === 'Both' && styles.selectedOption,
        ]}
        onPress={() => handleSelection('Both')}>
        <Text style={styles.optionText}>I'm Both</Text>
      </TouchableOpacity>

      <View style={styles.nextButtonView}>
        <TouchableOpacity
          style={styles.nextButton}
          disabled={!userType}
          onPress={handleNext}>
          <Image
            source={require('../../components/assets/next.png')}
            style={styles.nextIcon}
          />
        </TouchableOpacity>
      </View>
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

export default ConsumerType;
