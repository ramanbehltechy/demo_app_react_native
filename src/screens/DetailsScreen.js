import {ImageBackground, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {theme} from '../themes';
import {DataContext} from '../contexts/dataContext';
import {Button, List} from '../components';
import AddNewDish from '../components/Dishes/AddNewDish';

const DetailsScreen = ({navigation, route}) => {
  const {id, type} = route?.params;
  const {restaurants, dishes, updateDishesList} = useContext(DataContext);
  const [showModal, setShowModal] = useState(false);
  const [dishName, setDishName] = useState('');
  const [dishDetails, setDishDetails] = useState('');
  const details =
    type === 'RESTAURANTS'
      ? restaurants.find(i => i.id === id)
      : dishes.find(i => i.id === id);
  const filteredDishes = dishes.filter(i => i.restaurant_id === id);

  const onChangeAddText = (text, t) => {
    if (t === 'name') {
      setDishName(text);
    }
    if (t === 'details') {
      setDishDetails(text);
    }
  };

  const closeModal = () => {
    setDishName('');
    setDishDetails('');
    setShowModal(false);
  };

  const onPressSaveDish = () => {
    const newDishList = [
      {
        id: dishes ? dishes?.length + 1 : Math.floor(Math.random() * 10000),
        restaurant_id: id,
        name: dishName,
        details: dishDetails,
        imageUri:
          'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
        price: Math.fround(Math.random() * 100).toFixed(2),
      },
      ...dishes,
    ];
    updateDishesList(newDishList);
    closeModal();
  };

  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.imageRounded}>
        <ImageBackground
          source={{uri: details.imageUri}}
          style={styles.bannerStyle}>
          {type === 'RESTAURANTS' && (
            <Text style={styles.bannerText}>{details.name}</Text>
          )}
        </ImageBackground>
      </View>
      {type === 'RESTAURANTS' ? (
        <View style={styles.fullScreenContainer}>
          <Text style={styles.heading}>DISHES</Text>
          <List data={filteredDishes} type="DISHES" />
          <View style={styles.floatingBtn}>
            <Button
              title="ADD"
              onPress={() => {
                setShowModal(true);
              }}
              type="ROUND"
            />
          </View>
        </View>
      ) : (
        <View style={styles.body}>
          {type === 'DISHES' && (
            <>
              <Text style={styles.heading}>{details.name}</Text>
              <Text style={styles.bodyText}>
                {details.details
                  .split(',')
                  .map((i, inx) => `${inx + 1}) ${i}\n`)}
              </Text>
            </>
          )}
        </View>
      )}
      <Modal
        presentationStyle="pageSheet"
        animationType="slide"
        visible={showModal}
        onRequestClose={closeModal}>
        <View style={styles.fullScreenContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.heading}>Add New Dish</Text>
            <Button
              title="Close"
              onPress={closeModal}
              layoutStyle={styles.closeBtn}
            />
          </View>
          <AddNewDish
            dishName={dishName}
            details={dishDetails}
            onChangeText={onChangeAddText}
            onPressSave={onPressSaveDish}
          />
        </View>
      </Modal>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: theme.color.WHITE,
  },
  bannerStyle: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  bannerText: {
    fontSize: theme.fonts.HEADER,
    color: theme.color.WHITE,
    textShadowColor: theme.color.SHADOW,
    fontWeight: 'bold',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 3,
  },
  heading: {
    fontSize: theme.fonts.MEDIUM,
    color: theme.color.DARK,
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: '600',
  },
  bodyText: {
    fontSize: theme.fonts.BASE,
    color: theme.color.DARK,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imageRounded: {
    width: '98%',
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    elevation: 8,
    shadowColor: theme.color.SHADOW,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: theme.color.WHITE,
  },
  floatingBtn: {
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
    right: 20,
    width: 70,
  },
  modalHeader: {
    width: '100%',
    height: 60,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalHeaderText: {
    textAlign: 'center',
  },
  closeBtn: {
    width: 70,
    height: 40,
    borderRadius: 100,
  },
});
