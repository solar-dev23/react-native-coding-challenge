import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';

import {movieActions} from '../store';
import Header from '../components/layouts/Header';
import EmptyListMessage from '../components/layouts/EmptyListMessage';
import MovieItem from '../components/layouts/MovieItem';
import {IMovie} from '../types';

function FavoritesScreen() {
  const dispatch = useDispatch();
  const {list: movies} = useSelector((state: any) => state.movies);
  const [favorites, setFavorites] = useState<IMovie[]>([]);

  useEffect(() => {
    setFavorites(movies.filter((movie: IMovie) => movie.favorite));
  }, [movies]);

  const handleFavoriteUpdate = (movie: IMovie) => {
    if (movie.favorite) {
      dispatch(movieActions.removeFavorite(movie.id));
    } else {
      dispatch(movieActions.addFavorite(movie.id));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.main}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={favorites}
          renderItem={({item}) => (
            <MovieItem
              values={item}
              onFavorite={() => handleFavoriteUpdate(item)}
            />
          )}
          keyExtractor={movie => movie.id}
          ListEmptyComponent={EmptyListMessage({message: 'No Favorite Found'})}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  main: {
    width: '100%',
  },

  listContent: {
    paddingBottom: 100,
  },
});
export default FavoritesScreen;
