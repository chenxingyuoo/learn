import 'package:flutter/material.dart';
import './ui/pages/home.dart';
import './ui/pages/rank.dart';

import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';
import 'package:demo/redux/main.dart';


void main() {
  // final  store = new Store<CountState>(reducer, initialState: CountState.initState());
  final Store<ReduxState> store = AppStore.global;

  // final store =
      // Store<CountState>(reducer, initialState: CountState.initState());
  runApp(new MyApp(store: store));
}

class MyApp extends StatelessWidget {
  final Store<ReduxState> store;
   MyApp({this.store});

  @override
  Widget build(BuildContext context) {
    return new StoreProvider<ReduxState>(
      store: store, 
      child: new MaterialApp(
        title: 'Flutter Demo',
        theme: new ThemeData(
          primarySwatch: Colors.blue,
          primaryColor: Colors.blue,
          textTheme: TextTheme(
              body1: TextStyle(fontSize: 15.0, color: Colors.black87),
              body2: TextStyle(fontSize: 13.0, color: Colors.grey),
              caption: TextStyle(fontSize: 10.0, color: Colors.grey),
              display1: TextStyle(
                  fontSize: 14.0,
                  color: Colors.black87,
                  fontWeight: FontWeight.bold)),
        ),
        home: new MyHomePage(title: 'Flutter Demo Home Page'),
      )
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> with SingleTickerProviderStateMixin{
  TabController controller;

  @override
  void initState() { 
    super.initState();
    controller = new TabController(initialIndex: 0, length: 3, vsync: this);
  }

  @override
  void dispose() { 
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      body: TabBarView(
        controller: controller,
        children: <Widget>[
          HomePage(),
          RankPage()
        ],
      ),
      bottomNavigationBar: Material(
        // color: Theme.of(context).primaryColor,
        borderOnForeground: true,
        child: TabBar(
          labelColor: Theme.of(context).primaryColor,
          unselectedLabelColor: Colors.grey,
          controller: controller,
          tabs: <Tab>[
            Tab(text: 'Home', icon: Icon(Icons.home)),
            Tab(text: 'Rank', icon: Icon(Icons.home)),
          ],
        ),
      )
    );
  }
}