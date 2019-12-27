import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import Material from 'react-native-vector-icons/MaterialIcons';
import Views from './view'
const { width } = Dimensions.get('window')
const _HEADER_BACK_BUTTON = (navigation) => {
  const { routeName } = navigation.state
  return (<TouchableOpacity
    activeOpacity={0.7}
    style={{ top: 1, width: 54, paddingLeft: 15, justifyContent: 'center', alignItems: 'flex-start' }}
    onPress={() => navigation.goBack()}
  >
    <Material name={'keyboard-arrow-left'} size={30} color={'#333'} />
  </TouchableOpacity>)
}
const MODAL_DEFAULT_OPTIONS = {
  mode: 'modal',
  headerMode: 'none'
}

const STACKNAVIGATOR_DEFAULT_OPTIONS = {
  defaultNavigationOptions: ({ navigation }) => {
    let options = {
      headerTitle: (
        null
      ),
      drawerLockMode: 'locked-closed',
      headerStyle: {
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'transparent',
        shadowOpacity: 0,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        elevation: 0
      },
      headerTintColor: '#333',
      headerTitleStyle: { fontSize: 17, fontWeight: '600' },
      headerBackTitle: null,
      headerRight: <View style={{ top: 1, width: 54, paddingLeft: 15, justifyContent: 'center', alignItems: 'flex-start' }} />
    }
    if (!('index' in navigation.state)) {
      options = { ...options, headerLeft: _HEADER_BACK_BUTTON(navigation) }
    }
    return options
  }
}


const AppNavigator = createStackNavigator({ ...Views }, { ...STACKNAVIGATOR_DEFAULT_OPTIONS })

const IncludeModalContainerNavigator = createStackNavigator({
  Base: { screen: AppNavigator }
  /* add modal screen */
}, { ...MODAL_DEFAULT_OPTIONS })

const Base = createSwitchNavigator({
  // Load: ExtraViews.Loading,
  App: IncludeModalContainerNavigator,
  Auth: Views.Home
}, { initialRouteName: 'Auth' })

const AppContainer = createAppContainer(IncludeModalContainerNavigator)

export default AppContainer
