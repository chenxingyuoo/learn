'use strict';


import React from 'react';
import { StyleSheet,WebView, Button, Image, View, Text } from 'react-native';


export default class DetailsScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      scalesPageToFit: true,
      messagesReceivedFromWebView: 0,
      message: '',
    }
  }

  onMessage = e => {
    this.setState({
      messagesReceivedFromWebView: this.state.messagesReceivedFromWebView + 1,
      message: e.nativeEvent.data,
    })
  }

  render() {
    const { params } = this.props.navigation.state
    const data = params ? params.data : {}

    // const url = 'https://www.baidu.com'
    // source={require('../../html/index.html')}

    return (
        <View style={{flex: 1,paddingTop:15, position : 'relative'}}>

          <Text>message : {this.state.message}</Text>

          <Button
           style={{position :'absolute', top: 50, left : 20}}
           title="back"
           onPress={() => this.props.navigation.goBack()}
          />

          <Button
              title="sendMsg"
              onPress={() => this.webview.postMessage('"Hello" 我是RN发送过来的数据')}
          />

          <WebView
              ref={webview => { this.webview = webview; }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.8)',
              }}
              source={{uri : 'http://47.106.80.164/module/webapp.html#/articleDetails/' + data._id}}
              scalesPageToFit={true}
              onMessage={this.onMessage}
          />
        </View>

    );
  }
}

