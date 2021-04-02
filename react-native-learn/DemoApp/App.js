'use strict';

import React from 'react';
import api from './app/utils/api'
import request from './app/utils/request'
import { Button, Image, View, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'; // 1.0.0-beta.27
import Icon from 'react-native-vector-icons/Ionicons';
import ArticleList from './app/pages/Home/ArticleList'
import ArticleDetails from './app/pages/Home/ArticleDetails'

React.Component.prototype.$api = api
React.Component.prototype.$request = request

console.log('React', React);

class ModalScreen extends React.Component {
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}>This is a modal!</Text>
          <Icon name="rocket" size={15} color="red" />
          <Button
              onPress={() => this.props.navigation.goBack()}
              title="Dismiss"
          />
        </View>
    );
  }
}

const MainStack = createStackNavigator(
    {
      Home: {
        screen: ArticleList,
      }
    },
    {
      initialRouteName: 'Home',
      navigationOptions: {
        headerStyle: {
          // backgroundColor: '#f4511e',
        },
        // headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }
    }
);

const RootStack = createStackNavigator(
    {
      Main: {
        screen: MainStack,
      },
      MyModal: {
        screen: ModalScreen,
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
);


// Details: {
//   screen: ArticleDetails,
// },

// export default class App extends React.Component {
//   render() {
//     return <RootStack />;
//   }
// }



export default createBottomTabNavigator(
    {
      Home: RootStack,
      Settings: ArticleDetails,
    },
    {

      navigationOptions: ({ navigation }) => ({

        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = `ios-home`;
          } else if (routeName === 'Settings') {
            iconName = `ios-settings`;
          }

          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
);