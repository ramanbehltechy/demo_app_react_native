import React, {useCallback, useEffect, useMemo, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataContextDefaultValues = {
  restaurants: undefined,
  dishes: undefined,
  getRestaurantsList: () => Promise.resolve(),
  getDishesList: () => Promise.resolve(),
  updateRestaurantsList: _list => Promise.resolve(),
  updateDishesList: _list => Promise.resolve(),
};

export const DataContext = React.createContext(DataContextDefaultValues);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_RESTAURANTS':
      return {
        ...state,
        restaurants: action.payload,
      };

    case 'SET_DISHES':
      return {
        ...state,
        dishes: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

const DataContextProvider = props => {
  const [{restaurants, dishes}, dispatch] = useReducer(reducer, {
    restaurants: undefined,
    dishes: undefined,
  });

  const getDataFromLocalStorage = useCallback(async key => {
    try {
      const data = await AsyncStorage.getItem(key);
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }, []);

  const getRestaurantsList = useCallback(async () => {
    const localData = await getDataFromLocalStorage('@restaurants');
    let restaurantsList = [];
    if (localData) {
      restaurantsList = localData;
    } else {
      for (let i = 0; i <= 10; i++) {
        restaurantsList.push({
          id: i,
          name: 'Name Of Resturent ' + (i + 1),
          imageUri:
            'https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80',
          description:
            'This is restaurant open near XYZ Place with delicious food',
        });
      }
      AsyncStorage.setItem('@restaurants', JSON.stringify(restaurantsList));
    }

    dispatch({type: 'SET_RESTAURANTS', payload: restaurantsList});
  }, [getDataFromLocalStorage]);

  const getDishesList = useCallback(async () => {
    const localData = await getDataFromLocalStorage('@dishes');
    let j = 0;
    let dishesList = [];
    if (localData) {
      dishesList = localData;
    } else {
      for (let i = 0; i <= 100; i++) {
        dishesList.push({
          id: i,
          restaurant_id: j,
          name: 'Name Of Dish ' + (i + 1),
          imageUri:
            'https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80',
          price: Math.fround(Math.random() * 100).toFixed(2),
          details:
            'This dish made from Peas,It contain rich amount of fiber and protien',
        });
        if (j > 10) {
          j = 0;
        } else {
          j += 1;
        }
      }
      AsyncStorage.setItem('@dishes', JSON.stringify(dishesList));
    }
    dispatch({type: 'SET_DISHES', payload: dishesList});
  }, [getDataFromLocalStorage]);

  const updateRestaurantsList = useCallback(async list => {
    AsyncStorage.setItem('@restaurants', JSON.stringify(list));
    dispatch({type: 'SET_RESTAURANTS', payload: list});
  }, []);

  const updateDishesList = useCallback(async list => {
    AsyncStorage.setItem('@dishes', JSON.stringify(list));
    dispatch({type: 'SET_DISHES', payload: list});
  }, []);

  useEffect(() => {
    getRestaurantsList();
    getDishesList();
  }, [getRestaurantsList, getDishesList]);

  const contextValues = useMemo(() => {
    return {
      restaurants,
      dishes,
      getRestaurantsList,
      getDishesList,
      updateRestaurantsList,
      updateDishesList,
    };
  }, [
    dishes,
    getDishesList,
    getRestaurantsList,
    restaurants,
    updateDishesList,
    updateRestaurantsList,
  ]);
  return (
    <DataContext.Provider value={contextValues}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
