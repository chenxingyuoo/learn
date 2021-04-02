import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:demo/data/repository/repository.dart';

import 'package:demo/blocs/main_bloc.dart';
import 'package:demo/data/api/api.dart';
import 'package:demo/redux/main.dart';
import 'package:demo/ui/widgets/main.dart';
import 'package:demo/models/article.dart';
import 'package:demo/data/api/articles.dart';

import "package:pull_to_refresh/pull_to_refresh.dart";

bool isHomeInit = false;

class HomePage extends StatefulWidget {
  HomePage({Key key}) : super(key: key);

  @override
  _HomePageState createState() => new _HomePageState();
}

class _HomePageState extends State<HomePage> {
//  Repository repository = new Repository('chen');
//  dynamic bannerList = repository.getBanner();

  // final MainBloc bloc = new MainBloc();
  // dynamic banList = bloc.getBanner('3232');

  var isLoading = true;
  var isLoadmore = false;
  ScrollController _scrollController = ScrollController(); 
  RefreshController _refreshController = RefreshController(); 
  ArticlesNet articlesNet;

  getData() async {
    print('getData');

    await Networking.fetchBanners();
    await Networking.fetchtSchedule();
    await articlesNet.onLoadMore();

    setState(() {
      isLoading = false;
    });
  }
  
  void _onRefresh(bool up) async { 
  		if(up){
  		   //headerIndicator callback
         await articlesNet.onRefresh();
         _refreshController.sendBack(true, RefreshStatus.completed);
  		}
  		else{
  			//footerIndicator Callback
         List list = await articlesNet.onLoadMore();
         _refreshController.sendBack(false, list.length > 0 ? RefreshStatus.canRefresh : RefreshStatus.noMore);
     
  		}
  }

  @override
  void dispose() {
    super.dispose();
    _scrollController.dispose();
  }

  @override
  void initState() {
    super.initState();
    if (!isHomeInit) {
      getData();
      articlesNet = new ArticlesNet();
      isHomeInit = true;
    }
    // Networking.fetchBanners();
    // Networking.fetchtSchedule();
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: new AppBar(
          title: new Text('Home'),
        ),
        body: new StoreConnector<ReduxState, dynamic>(converter: (store) {
          return store.state.home;
        }, builder: (BuildContext context, vm) {
        

      if (vm.isLoading) {
        return Center(
                  child: CupertinoActivityIndicator(),
                );
      }  

      return SmartRefresher(
        controller: _refreshController,
        enablePullDown: true,
        enablePullUp: true,
        onRefresh: _onRefresh,
        child: ListView(
                      controller: _scrollController,
                      // primary: true,
                      children: <Widget>[
                        //banner
                        Container(
                          height: 250.0,
                          child: vm.banners.isNotEmpty
                              ? Swiper(
                                  itemBuilder: (BuildContext context, int index) {
                                    var pic = vm.banners[index]['pic'] ? vm.banners[index]['pic'] : 'http://tu.jstucdn.com/ftp/2019/0318/c9f1170ea0d94ed827890502c8159c20.jpg';
                                    return Image.network(pic,
                                        fit: BoxFit.fill);
                                    // if (vm.banners[index]['pic'] != null){
                                     
                                    // } else {
                                    //   return Image.asset("images/placeholder.png", fit: BoxFit.fill);
                                    // }
                                  },
                                  itemCount: vm.banners.length,
                                  // viewportFraction: 0.8,
                                  // scale: 0.9,
                                  pagination: SwiperPagination(),
                                )
                              : Container(),
                        ),
                        // title
                        SectionTitle(
                          title: "今日播出",
                        ),
                        // scroll
                        Container(
                            height: 150.0,
                            child: GridView.builder(
                                shrinkWrap: true,
                                scrollDirection: Axis.horizontal,
                                itemCount: vm.schedules.length,
                                itemBuilder: (context, index) {
                                  final item = vm.schedules[index];
                                  return GestureDetector(
                                      child: Card(
                                    margin: EdgeInsets.zero,
                                    child: GridTile(
                                      child: Hero(
                                        tag: item.poster,
                                        child: FadeInImage(
                                          fit: BoxFit.cover,
                                          image: NetworkImage(item.poster),
                                          placeholder: AssetImage(
                                            "images/placeholder.png",
                                          ),
                                        ),
                                      ),
                                      header: GridTileBar(
                                        leading: item.statusCn.isNotEmpty
                                            ? Tag(
                                                text: item.statusCn,
                                                color: Colors.white,
                                                backgroudColor: Theme.of(context)
                                                    .primaryColorDark
                                                    .withAlpha(200),
                                              )
                                            : Container(),
                                      ),
                                      footer: Container(
                                        height: 40.0,
                                        child: GridTileBar(
                                          title: Text(
                                            item.cnname,
                                            style: TextStyle(fontSize: 12.0),
                                          ),
                                          backgroundColor:
                                              Colors.black.withAlpha(120),
                                          subtitle: Text(
                                              "S${item.season.padLeft(2, '0')}E${item.episode.padLeft(2, '0')}",
                                              style: TextStyle(
                                                  color: Colors.white,
                                                  fontSize: 12.0)),
                                        ),
                                      ),
                                    ),
                                  ));
                                },
                                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                                  childAspectRatio: 1.2,
                                  crossAxisCount: 1,
                                  crossAxisSpacing: 5.0,
                                  mainAxisSpacing: 8.0),
                                ),
                              ),
                              SectionDivider(),
                              vm.articles.isNotEmpty
                                  ? ListView.builder(
                                      
                                      shrinkWrap: true,
                                      physics: ClampingScrollPhysics(),
                                      itemCount: vm.articles.length,
                                      itemBuilder: (context, index) {
                                        // var len = vm.articles.length;
                                        // final i = index ~/ 2;
                                        // print('i:$i');
                                        // print('len:$len');
                                        // if (i >= vm.articles.length) {
                                        //   articlesNet.onLoadMore();
                                        // }
                                        return ArticleView(
                                          vm: ArticleViewModel
                                              .fromArticle(vm.articles[index]),
                                        );
                                      },
                                    )
                                  : Container(),
                              isLoadmore ? Container(child: Text('loading')) : Container()
                      ],
                    )
          
      );

           
        }),
        );
  }
}
