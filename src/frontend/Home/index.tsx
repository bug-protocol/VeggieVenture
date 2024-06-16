/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import colors from '../../components/styles/colors';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../../backend/hooks/useAuth';
import {ToastAndroid} from 'react-native';
import {ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
const {height,width} = Dimensions.get('window');

const featuredListings = [
  {
    id: 1,
    title: 'Fresh Apples',
    price: '$5 per kg',
    location: 'Farmers Market',
    userPosted: 'John Appleseed',
    uri: 'https://www.tfcakes.in/images/products/230103_055939_548_440.jpg',
  },
  {
    id: 2,
    title: 'Organic Eggs',
    price: '$3 per dozen',
    location: 'Local Farm',
    userPosted: 'Jane Farmer',
    uri: 'https://media.istockphoto.com/id/465645566/photo/eggs-in-rattan-basket-a-healthy-food-gift-isolated.jpg?s=612x612&w=0&k=20&c=C2cnNM090Wvn9J7zm9hvOH_3DMouWwdqYG1f5gi_LcM=',
  },
  {
    id: 3,
    title: 'Grass-Fed Beef',
    price: '$10 per kg',
    location: 'Ranch',
    userPosted: 'Bob Butcher',
    uri: 'https://media.istockphoto.com/id/1150789260/photo/raw-meat.jpg?s=612x612&w=0&k=20&c=-IcSuBdOV42NRHckKOpUMpw5SFZIie-fbraPHB5JkFQ=',
  },
  {
    id: 4,
    title: 'Fresh Oranges',
    price: '$4 per kg',
    location: 'Farmers Market',
    userPosted: 'Samantha Citrus',
    uri: 'https://thumbs.dreamstime.com/b/orange-fruit-i-25591488.jpg',
  },
  {
    id: 5,
    title: 'Farm-Fresh Eggs',
    price: '$4 per dozen',
    location: 'Local Farm',
    userPosted: 'Frank Farmer',
    uri: 'https://media.istockphoto.com/id/465645566/photo/eggs-in-rattan-basket-a-healthy-food-gift-isolated.jpg?s=612x612&w=0&k=20&c=C2cnNM090Wvn9J7zm9hvOH_3DMouWwdqYG1f5gi_LcM=',
  },
  {
    id: 6,
    title: 'Organic Chicken',
    price: '$8 per kg',
    location: 'Free-Range Farm',
    userPosted: 'Chloe Poultry',
    uri: 'https://dylzm7u8zqclv.cloudfront.net/2019/03/24/23/20/39/7abaf0ab-3f47-4e1b-99ce-e74943a077a5/550.png',
  },
  {
    id: 7,
    title: 'Ripe Bananas',
    price: '$2 per bunch',
    location: 'Farmers Market',
    userPosted: 'Barry Banana',
    uri: 'https://media.istockphoto.com/id/173242750/photo/banana-bunch.jpg?s=612x612&w=0&k=20&c=MAc8AXVz5KxwWeEmh75WwH6j_HouRczBFAhulLAtRUU=',
  },
  {
    id: 8,
    title: 'Fresh Salmon',
    price: '$12 per kg',
    location: 'Fishery',
    userPosted: 'Sally Seafood',
    uri: 'https://media.istockphoto.com/id/532571540/photo/raw-salmon-on-baking-paper.jpg?s=612x612&w=0&k=20&c=vdlvtAL-PKsBhsKukpTgnIasvgM3-gkhtQWi2YGhaRk=',
  },
  {
    id: 9,
    title: 'Local Honey',
    price: '$8 per jar',
    location: 'Beekeeper',
    userPosted: 'Henry Bee',
    uri: 'https://media.istockphoto.com/id/520733611/photo/jar-of-honey-with-honeycomb.jpg?s=612x612&w=0&k=20&c=k7s6XnJvM1O3kLfy5XUn1M169j11Zcca9rFgvIBGkUE=',
  },
  {
    id: 10,
    title: 'Pork Chops',
    price: '$9 per kg',
    location: 'Local Butcher',
    userPosted: 'Peter Pork',
    uri: 'https://media.istockphoto.com/id/1143816283/photo/homemade-barbecue-pork-chops.jpg?s=612x612&w=0&k=20&c=zHKlX_KwuE-9QqEXSHJtWQ1oEUMvjPCtxCavq8qf9ik=',
  },
];


const categories = [
  {
    id: 1,
    title: 'Fresh Produce',
  },
  {
    id: 2,
    title: 'Dairy and Eggs',
  },
  {
    id: 3,
    title: 'Meat and Poultry',
  },
  {
    id: 4,
    title: 'Bakery and Grains',
  },
  {
    id: 5,
    title: 'Plants and Flowers',
  },
]

const Home = (props: any) => {
  const {user, CurrentData} = useAuth();
  const [address, setaddress] = useState('');
  const [searchText, setsearchText] = useState('')

  useEffect(() => {
    if (CurrentData.has('address')) {
      let k = CurrentData.get('address');
      if (k.length > 12) {
        k = k.substring(0, 12) + '...';
      }
      setaddress(k);
    }
  }, [CurrentData]);

  const onPressSearch = () => {

  }
  const renderList = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={{flex: 0.7}}>
          <Image
            source={{
              uri: item.uri,
            }}
            style={{flex: 1, resizeMode: 'contain'}}
          />
        </View>
        <View style={{flex: 0.3,marginHorizontal:5}}>
          <Text style={{fontSize: 17, color: colors.BLACK}}>{item.price}</Text>
          <View>
            <Text style={{fontSize: 15, fontWeight: '400',color:colors.GREY_1}}>{item.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Icon
                style={{marginBottom: 5}}
                name="location-outline"
                size={25}
                color={colors.BLACK}
              />
              <Text style={{color:colors.GREY_1}}>{ item.location}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={{flex: 1,backgroundColor:colors.WHITE}}>
      {/* Header */}
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}>
          {/* OLX logo */}
          <Text style={styles.title}>FarmFare</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              style={{marginHorizontal: 5}}
              name="location"
              size={30}
              color={colors.BLACK}
            />
            <Text style={{color: colors.BROWNISH_GREY}}>{address}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.WHITE,
            borderRadius: 7,
            height: 45,
            marginStart: 15,
            marginEnd: 15,
            flexDirection: 'row',
            borderWidth: 1,
            alignItems: 'center',
            marginBottom: 10,
            borderColor: 'black',
          }}>
          <TextInput
            style={{
              flex: 1,
              width: '70%',
              color: 'black',
              fontSize: 18,
              marginStart: 20,
              marginEnd: 10,
            }}
            placeholder={'Search here'}
            placeholderTextColor={'grey'}
            onChangeText={searchText => setsearchText(searchText)}
          />

          <TouchableOpacity onPress={onPressSearch}>
            <Icon
              style={{marginHorizontal: 5}}
              name="search"
              size={30}
              color={colors.BLACK}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{marginTop: 10}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {categories.map(category => {
          return (
            <TouchableOpacity
              style={{
                marginHorizontal: width * 0.01,
                height: height * 0.05,
              }}
              key={category.id}>
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: colors.BLACK,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    paddingHorizontal: 10,
                    color: colors.WHITE,
                    paddingVertical: 4,
                  }}>
                  {category.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Featured Listings */}
      <FlatList
        data={featuredListings}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        // style={{}}
        keyExtractor={item => item.id.toString()}
        renderItem={renderList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: height * 0.03,
    fontWeight: 'bold',
    color: colors.BLACK,
    alignSelf: 'center',
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
  itemContainer: {
    flex: 1,
    margin: 4,
    backgroundColor: colors.WHITE,
    height: 250,
    borderWidth: 2,
    borderColor: '#d4d2d2',
    borderRadius: 10,
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

export default Home;
