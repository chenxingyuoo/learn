'use strict';

import React from 'react';
import {Animated,FlatList, TouchableHighlight,TouchableOpacity,Button, Image, View, Text} from 'react-native';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
}

class MyListItem extends React.PureComponent {
  _onPress = () => {
    // this.props.onPressItem(this.props.id);
  };

  render() {
    console.log('this.props', this.props);

    return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('MyModal',{
          data : this.props.data
        })}>
        <View style={{flex : 1, flexDirection: 'row', borderWidth:1,borderColor:'#aaa', borderRadius: 5, marginBottom:10,padding:5}}>
          <View style={{width: 50, height: 50, marginRight: 20}}>
            <Image
                style={{width: 50, height: 50}}
                source={{uri: this.props.data.cover}}
            />
          </View>
          <View style={{flex : 1,flexDirection: 'row' }}>
            <View>
              <Text style={{marginBottom:10}}>{this.props.data.title}</Text>
              <Text>{this.props.data.desc}</Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
    )
  }
}


export default class ArticleList extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }

  constructor(props) {
    super(props);
    this.state = {
      horizontal: false,
      filterText: '',
      fixedHeight: true,
      logViewable: false,
      virtualized: true,
      categoryName: '全部',
      page: 1,
      pageSize: 10,
      totalCount : 0,
      hasMore : true,
      list: []
    };
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
        <AnimatedFlatList
            style={{marginLeft:10,marginRight:10,paddingTop:10}}
            data={this.state.list}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            onEndReached={this._getList}
            horizontal={false}
            refreshing={false}
            viewabilityConfig={VIEWABILITY_CONFIG}
        />
    )
  }

  _getList = () => {
    return this.$request.get({
      url : this.$api.getArticleList,
      data : {
        page : this.state.page,
        pageSize : this.state.pageSize,
        categoryName : this.state.categoryName
      }
    }).then((data) => {
      // console.log('data', data);
      if (data.list.length === 0) {
        this.setState({
          hasMore : false
        })
        return
      }

      data.list.map((row) => {
        this.state.list.push(row)
      })

      if (data.list !== this.state.pageSize) {
        this.setState({
          hasMore : false
        })
      }

      this.setState({
        page : this.state.page + 1,
        list : this.state.list,
        totalCount : data.totalCount,
      })
    })
  }

  _keyExtractor = (item, index) => item._id;

  _renderItem = ({item,index}) => {
    if (this.state.totalCount === index + 1) {
      return (
          <View>
            <MyListItem data={item} navigation={this.props.navigation} />

            <View style={{flex : 1,alignItems:'center',paddingBottom:10}}>
              {
                this.state.hasMore ?
                    <Text style={{color:'#3b99fc'}}>loading...</Text>
                    :
                    <Text>没有更多～</Text>
              }
            </View>
          </View>)
    } else {
      return <MyListItem data={item} navigation={this.props.navigation}/>
    }
  }
}