import React, {FC} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = TouchableOpacityProps & {
  icon: string;
  active?: boolean;
  color?: string;
  size?: number;
};

const IconButton: FC<Props> = props => {
  const {icon, active, color, size, onPress} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name={active ? icon : `${icon}-outline`}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
