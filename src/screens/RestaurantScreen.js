import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from '../themes';
import {List} from '../components';
import {DataContext} from '../contexts/dataContext';

const RestaurantScreen = () => {
  const {restaurants} = useContext(DataContext);

  return (
    <View style={styles.fullScreenContainer}>
      <List data={restaurants} type="RESTAURANTS" />
    </View>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: theme.color.WHITE,
  },
});
