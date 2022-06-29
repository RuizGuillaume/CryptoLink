import 'package:cryptolink/repositories/graph_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'graph_state.dart';

enum VueGraph { jour, semaine, mois, mois6, annee, all }

class GraphCubit extends Cubit<GraphState> {
  final GraphRepository _repository = GraphRepository();

  GraphCubit() : super(GraphInitial());

  Future<void> getGraph(VueGraph vueGraph, String? coinId) async {
    try {
      emit(GraphLoading());
      final List<Map<dynamic, dynamic>> cours =
          await _repository.getGraph(vueGraph, coinId);
      emit(GraphLoaded(cours));
    } on NetworkException catch (ex) {
      emit(GraphError(ex.message));
    }
  }
}
