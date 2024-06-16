import React, { useState } from 'react';
import {
  ImageBackground,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../../backend/hooks/useAuth';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const Profile = (props: any) => {
  const { user, CurrentData } = useAuth();
  const [selectedTag, setselectedTag] = useState('Recent')
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../components/assets/photo.png')}
        style={styles.imageBackground}>
        <View style={styles.header}>
          <Image
            style={styles.backIcon}
            source={require('../../components/assets/backIcon.png')}
          />
          {/* <Image source={require('./assets/filter.png')} />*/}
        </View>
        <LinearGradient
          colors={['rgba(36,19,50,1)', 'transparent']}
          style={styles.gradient}>
          <Text style={styles.gradientText}>{user?.displayName}</Text>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text style={styles.statsValue}>125</Text>
          <Text style={styles.statsLabel}>FOLLOWERS</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsValue}>150</Text>
          <Text style={styles.statsLabel}>FOLLOWING</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'Montserrat_700Bold',
              color: '#FFF',
            }}>
            321
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Montserrat_600SemiBold',
              color: '#918998',
            }}>
            LIKES
          </Text>
        </View>
      </View>
      <View style={styles.buttonParent}>
        <TouchableOpacity
          onPress={() => setselectedTag('Popular')}
          style={
            selectedTag == 'Popular'
              ? styles.buttonSelect
              : styles.buttonUnsSelect
          }>
          <Text
            style={
              selectedTag == 'Popular'
                ? styles.ButtonText
                : styles.buttonUnselect
            }>
            POPULAR
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setselectedTag('Recent')}
          style={
            selectedTag == 'Recent'
              ? styles.buttonSelect
              : styles.buttonUnsSelect
          }>
          <Text
            style={
              selectedTag == 'Recent'
                ? styles.ButtonText
                : styles.buttonUnselect
            }>
            RECENT
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#352641',
          borderRadius: 40,
          marginHorizontal: 10,
          paddingVertical: 20,
          marginTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Image
              style={styles.backIcon}
              source={require('../../components/assets/avatar.png')}
            />
          </View>

          <View
            style={{
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ProfileDetail')}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Montserrat_700Bold',
                  color: '#FFF',
                }}>
                Abhinav Sharma
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Montserrat_400Regular',
                color: '#918998',
              }}>
              1 hour ago
            </Text>
          </View>
          <Image
            source={require('../../components/assets/icons-chevron-light.png')}
            style={{marginHorizontal: 50}}
          />
        </View>
        <Text
          style={{
            fontSize: 17,
            fontFamily: 'Montserrat_400Regular',
            color: '#918998',
            marginVertical: 20,
            paddingHorizontal: 30,
            textAlign: 'center',
          }}>
          Fresh and flavorful produce! Excellent service, will definitely return
          for more. Thank you, {user?.displayName}!
        </Text>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Montserrat_400Regular',
              color: '#fff',
              paddingHorizontal: 10,
            }}>
            256
          </Text>
          <Image
            source={require('../../components/assets/icons-comment-dark.png')}
          />

          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Montserrat_400Regular',
              color: '#fff',
              paddingLeft: 30,
              paddingRight: 10,
            }}>
            516
          </Text>
          <Image
            source={require('../../components/assets/icons-like-dark.png')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#241332',
  },
  imageBackground: {
    height: 0.4 * h,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 60,
    alignItems: 'center',
  },
  backIcon: {
    height: 30,
    width: 30,
  },
  buttonSelect: {
    backgroundColor: '#8A56AC',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 60,
    alignSelf:'center',
  },
  buttonUnsSelect: {
    backgroundColor: '#352641',
    paddingHorizontal: 50,
    alignSelf: 'center',
    paddingVertical: 10,
    borderRadius: 60,
  },
  buttonParent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#352641',
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 60,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  buttonUnselect: {
    fontSize: 16,
    paddingLeft: 60,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#918998',
  },
  gradient: {
    transform: [{rotate: '180deg'}],
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    height: 0.16 * h,
  },
  gradientText: {
    transform: [{rotate: '-180deg'}],
    color: '#FFF',
    fontSize: 36,
    fontWeight:'700',
    marginVertical: 30,
    alignSelf: 'center',
    fontFamily: 'Montserrat_700Bold',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    marginTop: 30,
  },
  statsItem: {
    alignItems: 'center',
  },
  ButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#FFF',
  },
  statsValue: {
    fontSize: 30,
    fontFamily: 'Montserrat_700Bold',
    color: '#FFF',
  },
  statsLabel: {
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#918998',
  },
  buttonsContainer: {},
});
