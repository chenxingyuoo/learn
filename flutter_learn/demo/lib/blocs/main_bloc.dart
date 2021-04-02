import 'package:demo/data/repository/repository.dart';

class MainBloc {
  Repository repository = new Repository();

  Future getBanner(String labelId) {
    return repository.getBanner();
  }
}