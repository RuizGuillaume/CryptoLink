part of 'graph_cubit.dart';

@immutable
abstract class GraphState {}

class GraphInitial extends GraphState {}

class GraphLoading extends GraphState {}

class GraphLoaded extends GraphState {
  final List<List<Map<dynamic, dynamic>>> coursChart;
  final List<List<Map<dynamic, dynamic>>> coursCandlestick;
  GraphLoaded(this.coursChart, this.coursCandlestick);
}

class GraphError extends GraphState {
  final String message;
  GraphError(this.message);
}
