import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Header from '../components/layouts/Header';
import {IMovie} from '../types';
import useDebounce from '../hooks/useDebounce';
import MovieItem from '../components/layouts/MovieItem';
import EmptyListMessage from '../components/layouts/EmptyListMessage';
import {movieActions} from '../store';

function HomeScreen() {
  const dispatch = useDispatch();
  const {list: movies, loading} = useSelector((state: any) => state.movies);
  const [searchStr, setSearchStr] = useState<string>('');
  const debouncedSearchStr = useDebounce(searchStr, 500);

  useEffect(() => {
    if (!debouncedSearchStr) {
      dispatch(movieActions.clearState());
      return;
    }

    dispatch(movieActions.getList({search: debouncedSearchStr}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchStr]);

  const handleFavoriteUpdate = (movie: IMovie) => {
    if (movie.favorite) {
      dispatch(movieActions.removeFavorite(movie.id));
    } else {
      dispatch(movieActions.addFavorite(movie.id));
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <View style={styles.main}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          inputMode="search"
          value={searchStr}
          onChangeText={value => setSearchStr(value)}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            contentContainerStyle={styles.listContent}
            data={movies}
            renderItem={({item}) => (
              <MovieItem
                values={item}
                onFavorite={() => handleFavoriteUpdate(item)}
              />
            )}
            keyExtractor={movie => movie.id}
            ListEmptyComponent={EmptyListMessage({message: 'No Movie Found'})}
          />
        )}
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
  searchInput: {
    width: '100%',
    height: 40,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
});
export default HomeScreen;
