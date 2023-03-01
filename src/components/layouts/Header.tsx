import React, {FC} from 'react';
import {View, Image, StyleSheet} from 'react-native';

const logo = require('../../assets/images/logo.png');

type Props = {};

const Header: FC<Props> = () => {
  return (
    <View>
      <Image source={logo} resizeMode={'contain'} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 70,
  },
});

export default Header;
