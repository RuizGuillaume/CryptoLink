class Graph {
  List<Map<dynamic, dynamic>>? cours1J;
  List<Map<dynamic, dynamic>>? cours1S;
  List<Map<dynamic, dynamic>>? cours1M;
  List<Map<dynamic, dynamic>>? cours6M;
  List<Map<dynamic, dynamic>>? cours1A;
  List<Map<dynamic, dynamic>>? coursAll;

  addCours(List<List<Map<dynamic, dynamic>>?> listCoursCoin) {
    cours1J = listCoursCoin[0];
    cours1S = listCoursCoin[1];
    cours1M = listCoursCoin[2];
    cours6M = listCoursCoin[3];
    cours1A = listCoursCoin[4];
    coursAll = listCoursCoin[5];
  }
}
