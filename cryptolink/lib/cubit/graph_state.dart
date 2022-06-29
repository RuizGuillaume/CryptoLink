part of 'graph_cubit.dart';

@immutable
abstract class GraphState {}

class GraphInitial extends GraphState {}

class GraphLoading extends GraphState {}

class GraphLoaded extends GraphState {
  final List<Map<dynamic, dynamic>> cours;
  GraphLoaded(this.cours);
}

class GraphError extends GraphState {
  final String message;
  GraphError(this.message);
}
