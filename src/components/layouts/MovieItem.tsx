import React, {FC} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {IMovie} from '../../types';
import IconButton from '../base/IconButton';

type Props = {
  values: IMovie;
  onFavorite: () => void;
};

const MovieItem: FC<Props> = props => {
  const {values, onFavorite} = props;

  return (
    <View style={styles.container}>
      <Image style={styles.posterImage} source={{uri: values?.poster}} />
      <View style={styles.info}>
        <View style={styles.infoContent}>
          <Text style={styles.title}>{values?.title}</Text>
          <Text>Year: {values?.year}</Text>
          <Text>Type: {values?.type}</Text>
        </View>
        <View style={styles.favoriteButton}>
          <IconButton
            icon="ios-heart"
            size={24}
            color={'red'}
            active={values?.favorite}
            onPress={onFavorite}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    marginVertical: 16,
    padding: 8,
    borderRadius: 8,
  },
  posterImage: {
    width: 100,
    height: 150,
    backgroundColor: 'grey',
  },
  info: {
    flex: 1,
    paddingLeft: 16,
  },
  infoContent: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
  },
  favoriteButton: {
    alignItems: 'flex-end',
  },
});

export default MovieItem;
