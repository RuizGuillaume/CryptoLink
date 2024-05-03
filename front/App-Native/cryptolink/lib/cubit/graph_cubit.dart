import 'package:cryptolink/repositories/graph_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'graph_state.dart';

enum VueGraph { jour, semaine, mois, mois6, annee, all }

enum TypeGraph { chart, candlestick }

class GraphCubit extends Cubit<GraphState> {
  final GraphRepository _repository = GraphRepository();

  GraphCubit() : super(GraphInitial());

  Future<void> getGraph(
      VueGraph vueGraph, String? coinId, TypeGraph typeGraph) async {
    try {
      emit(GraphLoading());
      List<List<Map<dynamic, dynamic>>> coursChart =
          []; //Juste une liste de map comportant les données
      List<List<Map<dynamic, dynamic>>> coursCandledtick =
          []; //Une liste comportant: la liste de map comportant les données [0] ET une liste comportant une map comportant les absoluteminMax [1]
      switch (typeGraph) {
        case TypeGraph.chart:
          coursChart = await _repository.getGraph(vueGraph, coinId, typeGraph);
          break;
        case TypeGraph.candlestick:
          coursCandledtick =
              await _repository.getGraph(vueGraph, coinId, typeGraph);
          break;
        default:
          coursChart = await _repository.getGraph(vueGraph, coinId, typeGraph);
      }

      emit(GraphLoaded(coursChart, coursCandledtick));
    } on NetworkException catch (ex) {
      emit(GraphError(ex.message));
    }
  }
}
