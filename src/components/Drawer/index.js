import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {theme} from '../../themes';

const Index = props => {
  const {state, navigation} = props;

  const onNavigate = name => {
    navigation.jumpTo(name);
  };

  const renderItems = (item, index) => {
    const isActive = item.key === state.history[0].key;
    const activeLayout = isActive && styles.activeTab;
    return (
      <TouchableOpacity
        key={`${index}`}
        style={[styles.tabLayout, activeLayout]}
        activeOpacity={0.8}
        onPress={() => onNavigate(item.name)}>
        <Text style={styles.tabText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
          }}
          style={styles.profileImg}
        />
        <Text style={styles.userName}>User Name</Text>
      </View>
      <ScrollView>{state.routes.map(renderItems)}</ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: theme.color.WHITE,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 20,
  },
  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  userName: {
    fontSize: theme.fonts.BASE,
    fontWeight: 'bold',
    color: theme.color.PRIMARY,
    marginTop: 10,
    textAlign: 'center',
  },
  tabLayout: {
    width: '100%',
    padding: 10,
  },
  tabText: {
    fontSize: theme.fonts.BASE,
    fontWeight: '600',
    color: theme.color.DARK,
  },
  activeTab: {
    backgroundColor: theme.color.LIGHT_GREY,
  },
});
