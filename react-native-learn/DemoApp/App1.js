/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, Button, NavigatorIOS, NativeModules} from 'react-native';
import {createStackNavigator, createBottomTabNavigator, StackActions, NavigationActions} from 'react-navigation'; // Version can be specified in package.json

console.log('RNGestureHandlerModule', NativeModules.RNGestureHandlerModule);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

// export default class App extends Component<{}> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


// class DetailsScreen extends React.Component {
//   render() {
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text>Details!</Text>
//         </View>
//     );
//   }
// }
//
// class HomeScreen extends React.Component {
//   render() {
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           {/* other code from before here */}
//           <Button
//               title="Go to Details"
//               onPress={() => this.props.navigation.navigate('Details')}
//           />
//         </View>
//     );
//   }
// }

class LogoTitle extends React.Component {
  render() {
    return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Image
              source={require('./app/imgs/logo.png')}
              style={{width: 20, height: 20}}
          />
          <Text>Home</Text>
        </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* other code from before here */}
          <Button
              title="Go to Details2"
              onPress={() => this.props.navigation.navigate('Details')}
          />
        </View>
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}>This is a modal!</Text>
          <Button
              onPress={() => this.props.navigation.goBack()}
              title="Dismiss"
          />
        </View>
    );
  }
}


class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Home',
  //
  // };
  static navigationOptions = ({navigation}) => {
    console.log('navigation', navigation);
    return {
      // headerTitle instead of title
      headerTitle: <LogoTitle/>,
      headerLeft: (
          <Button
              onPress={() => navigation.navigate('MyModal')}
              title="Info"
              color="#fff"
          />
      ),
      headerRight: (
          <Button
              onPress={navigation.getParam('increaseCount')}
              title="+1"
              color="#fff"
          />
      ),
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({increaseCount: this._increaseCount});
  }

  state = {
    count: 0,
  }

  _increaseCount = () => {
    this.setState({count: this.state.count + 1});
  }

  render() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Home Screen</Text>
          <Text>Count: {this.state.count}</Text>
          <Button
              title="Go to Details"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('Details', {
                  itemId: 86,
                  otherParam: 'anything you want here',
                });
              }}
          />
        </View>
    );
  }
}

class DetailsScreen extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: navigation.getParam('otherParam', 'A Nested Details Screen'),
  //   };
  // };

  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: params ? params.otherParam : 'A Nested Details Screen',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const {navigation} = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Details Screen</Text>
          <Text>itemId: {JSON.stringify(itemId)}</Text>
          <Text>otherParam: {JSON.stringify(otherParam)}</Text>
          <Button
              title="Go to Details... again"
              onPress={() => {
                // this.props.navigation.setParams({otherParam: 'Updated!'})
                this.props.navigation.push('Details', {
                  itemId: Math.floor(Math.random() * 100),
                })
              }
              }
          />
          <Button
              title="Go to Home"
              onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button
              title="Go back"
              onPress={() => this.props.navigation.goBack()}
          />
        </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
}, {
  initialRouteName: 'Home',
  /* The header config from HomeScreen is now here */
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Details: DetailsScreen,
});

export default createBottomTabNavigator(
    {
      Home: HomeStack,
      Settings: SettingsStack,
    },
    {
      /* Other configuration remains unchanged */
    }
);