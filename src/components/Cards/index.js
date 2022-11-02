import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {theme} from '../../themes';

const index = ({
  imageUri,
  title,
  description,
  subItem,
  price,
  type,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress && onPress()}
      style={styles.card}>
      {imageUri && <Image source={{uri: imageUri}} style={styles.cardImg} />}
      <View style={styles.cardBody}>
        {title && <Text style={styles.cardTitle}>{title}</Text>}
        {description && (
          <Text
            numberOfLines={type === 'RESTAURANTS' ? 1 : 3}
            style={styles.cardDescription}>
            {type === 'RESTAURANTS'
              ? description
              : description.split(',').map((i, inx) => `${inx + 1}) ${i}\n`)}
          </Text>
        )}
        {subItem && (
          <View>
            {subItem.name && (
              <Text style={styles.subItemTitle}>{subItem.name}</Text>
            )}
            {subItem.details && (
              <Text numberOfLines={2} style={styles.subItemDesc}>
                {subItem.details
                  .split(',')
                  .map((item, inx) => `${inx + 1}) ${item}\n`)}
              </Text>
            )}
          </View>
        )}
        {type === 'DISHES' && price ? <Text>Rs~ {price}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

export default index;

const styles = StyleSheet.create({
  cardImg: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: theme.fonts.BASE,
    fontWeight: 'bold',
    color: theme.color.DARK,
    marginBottom: 3,
  },
  cardDescription: {
    fontSize: theme.fonts.BASE,
    color: theme.color.DARK,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    elevation: 8,
    shadowColor: theme.color.SHADOW,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: theme.color.WHITE,
    zIndex: 9,
  },
  cardBody: {
    flex: 1,
    marginLeft: 10,
  },
  subItemTitle: {
    fontSize: theme.fonts.TINY,
    fontWeight: 'bold',
    color: theme.color.DARK,
    marginBottom: 3,
  },
  subItemDesc: {
    fontSize: theme.fonts.TINY,
    color: theme.color.DARK,
  },
});
