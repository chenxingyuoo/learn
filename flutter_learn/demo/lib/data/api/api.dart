import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:demo/models/ad.dart';
import 'package:demo/models/tv_schedule.dart';
import 'package:demo/redux/main.dart';
import 'package:demo/redux/home.dart';
import 'package:intl/intl.dart';

class Networking {
  static fetchBanners() async {
    final url = "http://ctrl.zmzapi.net/app/ads?platform=7&ver=252";
    var response = await http.get(url);
    List map = json.decode(response.body)["ads"];

    // List<Ad> list = [];
    // list = map.map((v) => Ad.fromJson(v)).toList();

    List list = map;
    AppStore.global.dispatch(UpdateBanners(payload: list));
    return list;
  }

  static fetchtSchedule() async {
    final today = DateTime.now();
    final formatter = DateFormat("yyyy-MM-dd");
    final start = formatter.format(today);
    final end = formatter.format(today.add(Duration(days: 1)));

    final url =
        "http://ios.zmzapi.com/index.php?accesskey=519f9cab85c8059d17544947k361a827&client=1&g=api/v3&m=index&a=tv_schedule&end=$end&start=$start";
    var response = await http.get(url);
    Map<String, dynamic> map = json.decode(response.body)["data"];
    
    List<TVSchedule> list = [];
    map.keys.forEach((key) {
      list.addAll(
          (map[key] as List).map((v) => TVSchedule.fromJson(v)).toList());
    });

    // print('list');
    // print(list);

    AppStore.global.dispatch(UpdateTVSchedule(payload: list));
  }

  
}