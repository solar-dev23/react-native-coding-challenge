import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';

type Props = {
  message: string;
};

const EmptyListMessage: FC<Props> = props => {
  const {message = 'No Movie Found'} = props;

  return <Text style={styles.emptyListStyle}>{message}</Text>;
};

const styles = StyleSheet.create({
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default EmptyListMessage;
