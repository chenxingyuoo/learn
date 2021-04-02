import 'package:flutter/foundation.dart';
import './common.dart';

@immutable
/**
 * state
 */
class HomeState {
  List banners;
  List schedules;
  List articles;
  bool isLoading;
  // get banners => _banners; 

  HomeState({this.banners, this.schedules, this.articles, this.isLoading});

  HomeState copyWith(
    {
      List banners,
      List schedules,
      List articles,
      bool isLoading
      }) {
    return HomeState(
        banners: banners ?? this.banners,
        schedules: schedules ?? this.schedules,
        articles: articles ?? this.articles,
        isLoading: isLoading ?? this.isLoading
    );
   }

  HomeState.initState() 
      : banners = [],
        schedules = [], 
        articles = [],
        isLoading = true;
}

/**
 * action
 */
class UpdateBanners extends ActionType{
  final List payload;
  UpdateBanners({this.payload}) : super(payload: payload);
}

class UpdateTVSchedule extends ActionType{
  final List payload;
  UpdateTVSchedule({this.payload}) : super(payload: payload);
}
class UpdateArticles extends ActionType{
  final List payload;
  final int page;
  UpdateArticles({this.payload, this.page}) : super(payload: payload);
}



/**
 * reducer
 */
HomeState homeReducer(HomeState state, ActionType action) {
  //匹配Action
  if (action is UpdateBanners) {
    // state.banners = action.payload;
    return state.copyWith(banners: action.payload);
  }

  if (action is UpdateTVSchedule) {
    return state.copyWith(schedules: action.payload, isLoading: false);
  }

   if (action is UpdateArticles) {
     if (action.page == 0) {
       state.articles = action.payload;
     } else {
       state.articles.addAll(action.payload.map((v) => v));
     }
    // return state.copyWith(articles: action.payload,);
  }
  
  return state;
}