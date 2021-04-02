import 'package:redux/redux.dart';
import 'package:flutter/foundation.dart';
import './home.dart';


@immutable
class ReduxState {
  final HomeState home;

  const ReduxState({
    this.home
  });
}

ReduxState reduxReducer(ReduxState state, action) {
  return new ReduxState(
    home: homeReducer(state.home, action),
  );
}


class AppStore {
  static final Store<ReduxState> global = new Store<ReduxState>(
    reduxReducer,
    initialState: new ReduxState(
      home: HomeState.initState()
    ),
    middleware: [ loggingMiddleware ]
  );
}

loggingMiddleware(Store<ReduxState> store, action, NextDispatcher next) {
    print('${new DateTime.now()}: $action');
  
    next(action);
  }
