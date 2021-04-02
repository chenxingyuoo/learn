import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:demo/models/article.dart';
import 'package:demo/redux/main.dart';
import 'package:demo/redux/home.dart';

class ArticlesNet {
  int _comListPage = 0;

  Future fetchArticles(int page) async {
    print('page');
    print(page);
    final url =
        "http://ios.zmzapi.com/index.php?accesskey=519f9cab85c8059d17544947k361a827&client=1&g=api/v3&m=index&a=article_list&token=edc3c80aed456c1266237e555b5bf218&uid=5704761&page=$page";
    
    var response = await http.get(url);

    if (response.statusCode == HttpStatus.OK) {
      List map = json.decode(response.body)["data"];
      
      print(map);
      List<Article> list = [];
      list = map.map((v) => Article.fromJson(v)).toList();
      AppStore.global.dispatch(UpdateArticles(payload: list, page: page));
      return list;
    } else {
      _comListPage = _comListPage - 1;
    }
  }

  @override
  Future onLoadMore() {
    int _page = 0;
    _page = ++_comListPage;
    return fetchArticles(_page);
  }

  @override
  Future onRefresh({String labelId, int cid}) {
    _comListPage = 0;

    return fetchArticles(_comListPage);
  }
}