/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Platform, StyleSheet, Text, View, Button,NavigatorIOS, NativeModules} from 'react-native';
import { createStackNavigator } from 'react-navigation';


console.log('RNGestureHandlerModule', NativeModules.RNGestureHandlerModule);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
  'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

class HomeScreen extends React.Component {
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
        </View>
    );
  }
}

export default createStackNavigator({
  Home: {
    screen: HomeScreen
  },
});


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });


// const AppNavigator =  createStackNavigator(
//     {
//       Home: {screen: HomeScreen}
//     },
//     {
//       initialRouteName: 'Home'
//     }
// )
//
// export default class App extends React.Component {
//   render() {
//     return <AppNavigator /* persistenceKey="if-you-want-it" */ />;
//   }
// }



// class MyScene extends React.Component {
//   static propTypes = {
//     route: PropTypes.shape({
//       title: PropTypes.string.isRequired
//     }),
//     navigator: PropTypes.object.isRequired
//   };
//
//   constructor(props, context) {
//     super(props, context);
//     this._onForward = this._onForward.bind(this);
//   }
//
//   _onForward() {
//     let nextIndex = ++this.props.index;
//     this.props.navigator.push({
//       component: MyScene,
//       title: "Scene " + nextIndex,
//       passProps: { index: nextIndex }
//     });
//   }
//
//   render() {
//     return (
//         <View style={styles.container}>
//           <Text>Current Scene: {this.props.title}</Text>
//           <Button
//               onPress={this._onForward}
//               title="Tap me to load the next scene"
//           />
//         </View>
//     );
//   }
// }
//
// export default class NavigatorIOSApp extends React.Component {
//   render() {
//     return (
//         <NavigatorIOS
//             initialRoute={{
//               component: MyScene,
//               title: "My Initial Scene",
//               passProps: { index: 1 }
//             }}
//             style={{ flex: 1 }}
//         />
//     );
//   }
// }
