import {NavigationContainer, getFocusedRouteNameFromRoute, useNavigation, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../frontend/Home';
import colors from '../../components/styles/colors';
import React, {useState, useEffect} from 'react';
import ConsumerType from '../../frontend/Preferences/ConsumerType';
import {View, Image, Text, TouchableOpacity} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Location from '../../frontend/Preferences/Location';
import FastImage from 'react-native-fast-image';
import greenLoader from '../../components/greenLoader';
import Modal from 'react-native-modal';
import RequestType from '../../frontend/AddStack/RequestType';
import RequestPage from '../../frontend/AddStack/RequestPage';
import Profile from '../../frontend/ProfileStack/Profile';
import { useAuth } from '../hooks/useAuth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LoginJourneyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ConsumerType" component={ConsumerType} />
      <Stack.Screen name="Location" component={Location} />
    </Stack.Navigator>
  );
};

const ChatStack = () => {};

const OrderStack = () => {};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const AddStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="RequestType" component={RequestType} />
      <Stack.Screen name="RequestPage" component={RequestPage} />
    </Stack.Navigator>
  );

};


const TabStack = () => {
  const { user, CurrentData } = useAuth();
  const navigation = useNavigation();
  const [TabStackColor, setTabStackColor] = useState<string>(colors.WHITE)
  const route = useRoute()
  const activeTab = getFocusedRouteNameFromRoute(route)

  useEffect(() => {
    if (activeTab == 'ProfileStack') {
      setTabStackColor('rgba(36,19,50,1)');
    } else {
      setTabStackColor(colors.WHITE);
    }
  }, [activeTab])


  return (
    <View style={{flex:1,backgroundColor:TabStackColor}}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.BLACK, //change this color to purple on clikcing the profile stack
            borderRadius: 20,
            marginBottom: 8,
          },
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                }}>
                <Image
                  source={require('../../components/assets/home2.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? colors.CYAN : colors.OFF_GREY,
                    height: 35,
                    width: 35,
                  }}
                />
                <Image
                  source={require('../../components/assets/home.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? colors.CYAN : colors.BLACK,
                    height: 5,
                    width: 5,
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="OrderStack"
          component={OrderStack}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('../../components/assets/money_ledger.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? colors.CYAN : colors.OFF_GREY,
                    height: 35,
                    width: 35,
                  }}
                />
                <Image
                  source={require('../../components/assets/home.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? colors.CYAN : colors.BLACK,
                    height: 5,
                    width: 5,
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddStack}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 40,
                }}>
                <Image
                  source={require('../../components/assets/add.png')}
                  resizeMode="contain"
                  style={{
                    height: 60,
                    width: 65,
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="ChatStack"
          component={ChatStack}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('../../components/assets/chat.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? colors.CYAN : colors.OFF_GREY,
                    height: 35,
                    width: 35,
                  }}
                />
                <Image
                  source={require('../../components/assets/home.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? colors.CYAN : colors.BLACK,
                    height: 5,
                    width: 5,
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('../../components/assets/person-profile.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? colors.CYAN : colors.OFF_GREY,
                    height: 35,
                    width: 35,
                  }}
                />
                <Image
                  source={require('../../components/assets/home.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? colors.CYAN : colors.BLACK,
                    height: 5,
                    marginTop: 2,
                    width: 5,
                  }}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const UserStack = (user: any) => {
  const [showGIF, setshowGIF] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setshowGIF(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  if (showGIF) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.WHITE,
        }}>
        <FastImage
          source={require('../../components/assets/loader.gif')}
          style={{width: 200, height: 200}} // Adjust the width and height as needed
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    );
  }


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user.CurrentData.get('address') ? (
          <Stack.Screen name="TabStack" component={TabStack} />
        ) : (
          <Stack.Group>
            <Stack.Screen name="LoginJourney" component={LoginJourneyStack} />
            <Stack.Screen name="TabStack" component={TabStack} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;
