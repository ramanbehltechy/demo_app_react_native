import {FlatList, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import Card from '../Cards';
import {DataContext} from '../../contexts/dataContext';
import {useNavigation} from '@react-navigation/native';

const Index = ({data, type}) => {
  const {dishes} = useContext(DataContext);
  const navigation = useNavigation();

  const onPressCard = (id, cardType) => {
    navigation.navigate('Details', {id: id, type: cardType});
  };

  const renderItems = ({item}) => {
    const topDish =
      type === 'RESTAURANTS' &&
      dishes &&
      dishes.find(i => i.restaurant_id === item.id);
    const description =
      type === 'RESTAURANTS' ? item.description : item?.details;

    return (
      <Card
        title={item.name}
        subItem={topDish}
        type={type}
        description={description}
        imageUri={item.imageUri}
        price={item.price}
        onPress={() => onPressCard(item.id, type)}
      />
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItems}
      keyExtractor={(_, i) => `${i}`}
      style={styles.listStyle}
      contentContainerStyle={styles.listContainerStyle}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
    />
  );
};

export default Index;

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
  },
  listContainerStyle: {
    flexGrow: 1,
    width: '100%',
    alignSelf: 'center',
    padding: 15,
  },
  divider: {
    height: 15,
  },
});
