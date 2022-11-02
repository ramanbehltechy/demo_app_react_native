import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from '../themes';
import {List} from '../components';
import {DataContext} from '../contexts/dataContext';

const DishesScreen = () => {
  const {dishes} = useContext(DataContext);

  return (
    <View style={styles.fullScreenContainer}>
      <List data={dishes} type="DISHES" />
    </View>
  );
};

export default DishesScreen;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: theme.color.WHITE,
  },
});
