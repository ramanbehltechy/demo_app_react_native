import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {theme} from '../../themes';

const index = ({title, onPress, type, layoutStyle}) => {
  const btnRound = {borderRadius: type === 'ROUND' ? 100 : 10};

  return (
    <TouchableOpacity
      style={[styles.btnLayout, btnRound, layoutStyle]}
      activeOpacity={0.8}
      onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default index;

const styles = StyleSheet.create({
  btnLayout: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.PRIMARY,
  },
  btnText: {
    fontSize: theme.fonts.BASE,
    fontWeight: '700',
    color: theme.color.WHITE,
  },
});
