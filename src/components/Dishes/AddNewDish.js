import {StyleSheet, TextInput, View, Text} from 'react-native';
import React, {useRef} from 'react';
import {theme} from '../../themes';
import Button from '../Button';

const AddNewDish = ({dishName, details, onChangeText, onPressSave}) => {
  const detailRef = useRef(null);
  return (
    <View style={styles.fullScreenContainer}>
      <Text style={styles.lable}>Dish Name</Text>
      <TextInput
        value={dishName}
        placeholder={'Dish Name'}
        onChangeText={text => onChangeText(text, 'name')}
        style={styles.inputStyle}
      />
      <Text style={styles.lable}>
        Details <Text style={styles.textTiny}>`use , append new value`</Text>
      </Text>
      <View
        onTouchEnd={() => detailRef.current?.focus()}
        style={[styles.inputStyle, styles.detailsTextInput]}>
        <TextInput
          ref={detailRef}
          value={details}
          placeholder={'Add Dish Details'}
          onChangeText={text => onChangeText(text, 'details')}
        />
      </View>
      <Button title="Save" onPress={onPressSave} />
    </View>
  );
};

export default AddNewDish;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: theme.color.WHITE,
    paddingHorizontal: 20,
  },
  lable: {
    fontSize: theme.fonts.BASE,
    color: theme.color.DARK,
    marginVertical: 10,
  },
  inputStyle: {
    width: '100%',
    borderWidth: 1,
    borderColor: theme.color.PRIMARY,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  detailsTextInput: {
    height: 150,
    padding: 10,
  },
  textTiny: {
    fontSize: theme.fonts.TINY,
    color: theme.color.SHADOW,
  },
});
