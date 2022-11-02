import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RestaurantScreen from '../screens/RestaurantScreen';
import {NavigationContainer} from '@react-navigation/native';
import DishesScreen from '../screens/DishesScreen';
import DetailsScreen from '../screens/DetailsScreen';
import {CustomDrawer} from '../components';
import {StyleSheet} from 'react-native';
import {theme} from '../themes';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTabs = createBottomTabNavigator();

const TabsNavigator = ({navigation}) => {
  return (
    <BottomTabs.Navigator
      screenListeners={{
        focus: e => navigation.setOptions({title: e.target.split('-')[0]}),
      }}
      screenOptions={{
        headerShown: false,
        tabBarIconStyle: {display: 'none'},
        tabBarLabelStyle: {fontSize: theme.fonts.BASE, marginBottom: 15},
      }}>
      <BottomTabs.Screen name="Resturents" component={RestaurantScreen} />
      <BottomTabs.Screen name="Dishes" component={DishesScreen} />
    </BottomTabs.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={TabsNavigator} />
    </Drawer.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
