import 'package:demo/common/common.dart';
import 'package:demo/data/api/apis.dart';
import 'package:demo/data/net/dio_util.dart';

class Repository {
   final String name;
   Repository({this.name});
  
   getBanner() async {
    BaseResp<List> baseResp = await DioUtil().request<List>(
        Method.get, Api.getPath(path: Api.BANNER));

    List bannerList;

    if (baseResp.code != Constant.STATUS_SUCCESS) {
      return new Future.error(baseResp.msg);
    } 

    if (baseResp.data != null) {
      print('baseResp.data');
      print(baseResp.data);
      bannerList = baseResp.data;
      // bannerList = baseResp.data.map((value) {
      //   return value
      // }).toList();
    }
    return bannerList;
  }
}