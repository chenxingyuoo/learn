import 'package:flutter/material.dart';
import 'package:flutter_wanandroid/common/component_index.dart';

class OtherPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    List<ComModel> list = new List();
    list.add(new ComModel(
        title: "WanAndroid Api", url: "http://www.wanandroid.com"));
    list.add(new ComModel(
        title: "界面参考Gitme", url: "https://flutterchina.club/app/gm.html"));
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('其他'),
        centerTitle: true,
      ),
      body: new ListView.builder(
          itemCount: list.length,
          itemBuilder: (BuildContext context, int index) {
            ComModel model = list[index];
            return new ComArrowItem(model);
          }),
    );
  }
}
