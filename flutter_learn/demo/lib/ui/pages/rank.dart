import 'package:flutter/material.dart';

class RankPage extends StatefulWidget {
  @override
  _RankPageState createState() => _RankPageState();
}

class _RankPageState extends State<RankPage>{
  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      appBar: new AppBar(
        title: new Text('Rank'),
      ),
      body: Container(
        child: Text('rank page'),
      )
    );
  }
}