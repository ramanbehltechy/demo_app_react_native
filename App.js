import React from 'react';
import RootNavigator from './src/navigations/RootNavigator';
import 'react-native-gesture-handler';
import DataContextProvider from './src/contexts/dataContext';

const App = () => {
  return (
    <DataContextProvider>
      <RootNavigator />
    </DataContextProvider>
  );
};

export default App;
