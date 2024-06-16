import { View, Text } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import colors from './styles/colors';

const greenLoader = (loader) => {
    if (loader) {
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

}

export default greenLoader