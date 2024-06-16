import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import colors from '../../components/styles/colors';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../../backend/hooks/useAuth';
import {ToastAndroid} from 'react-native';

const RequestPage = (props: any) => {
  const {user} = useAuth();
  const [itemName, setItemName] = useState('');
  const [isVeg, setIsVeg] = useState(true); // Default to veg
  const slideAnimation = useRef(new Animated.Value(1)).current;

  const handleNext = async () => {
    console.log('Adding item to Firebase');

    // Construct the item object to be added to Firebase
    const newItem = {
      itemName,
      isVeg,
      // Add other item-related fields as needed
    };

    // TODO: Add code to store the item in Firebase
    // Example code (uncomment and adapt as needed):
    // await firestore()
    //   .collection('items')
    //   .add(newItem)
    //   .then(() => {
    //     ToastAndroid.show('Item added!', ToastAndroid.SHORT);
    //     props.navigation.navigate('Location');
    //   });
  };

  const toggleVegNonVeg = () => {
    setIsVeg(!isVeg); // Toggle the value of isVeg
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Image
          source={require('../../components/assets/backIcon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <View style={{marginLeft: 10, marginTop: 30}}>
        <Text style={{fontSize: 18, color: colors.BLACK}}>Item Name</Text>
      </View>
      <TextInput
        placeholder="Item name..."
        style={{
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: colors.WHITE,
          paddingLeft: 10,
          marginTop: 10,
          marginLeft: 10,
        }}
        value={itemName}
        onChangeText={text => setItemName(text)}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 10,
          marginTop: 20,
        }}>
        <Text style={{fontSize: 18, color: colors.BLACK}}>Veg or Non-Veg:</Text>
        <TouchableOpacity
          style={[
            styles.toggleSwitch,
            isVeg ? styles.activeSwitch : styles.inactiveSwitch,
          ]}
          onPress={toggleVegNonVeg}>
          <Text style={styles.switchText}>{isVeg ? 'Veg' : 'Non-Veg'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.nextButtonView}>
        <TouchableOpacity
          style={styles.nextButton}
          disabled={!itemName}
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

// Your existing styles...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.WHITE,
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
  toggleSwitch: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginLeft: 10,
    borderWidth: 1,
  },
  activeSwitch: {
    backgroundColor: '#61d64f',
    borderColor: '#61d64f',
  },
  inactiveSwitch: {
    backgroundColor: 'gray',
    borderColor: 'gray',
  },
  switchText: {
    color: 'white',
  },
});

export default RequestPage;
