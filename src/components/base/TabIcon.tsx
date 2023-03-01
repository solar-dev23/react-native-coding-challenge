import React, {FC} from 'react';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

type Props = {
  route: RouteProp<ParamListBase, string>;
  focused: boolean;
  color: string;
  size: number;
};

const TabIcon: FC<Props> = props => {
  const {route, focused, color, size} = props;

  let iconName: string = '';

  if (route.name === 'Home') {
    iconName = focused ? 'ios-home' : 'ios-home-outline';
  } else if (route.name === 'Favorites') {
    iconName = focused ? 'ios-heart' : 'ios-heart-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

export default TabIcon;
