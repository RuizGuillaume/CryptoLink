import 'package:cryptolink/cubit/graph_cubit.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:graphic/graphic.dart';
import 'package:top_snackbar_flutter/custom_snack_bar.dart';
import 'package:top_snackbar_flutter/top_snack_bar.dart';

// ignore: must_be_immutable
class Graph extends StatelessWidget {
  String? coinId;
  Graph({
    Key? key,
    this.coinId,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<GraphCubit, GraphState>(
      listener: (context, state) {
        if (state is GraphError) {
          showTopSnackBar(
            context,
            CustomSnackBar.error(
              message: state.message,
            ),
          );
        }
      },
      builder: (context, state) {
        if (state is GraphLoaded) {
          return buildContent(
              context, state.coursChart, state.coursCandlestick);
        }
        return buildLoading();
      },
    );
  }

  Widget buildLoading() {
    return const SizedBox(
      height: 300,
      child: Center(
        child: CircularProgressIndicator(),
      ),
    );
  }

  Widget buildContent(
      BuildContext context,
      List<List<Map<dynamic, dynamic>>> coursChart,
      List<List<Map<dynamic, dynamic>>> coursCandlestick) {
    return Column(
      children: [
        getEvol(coursChart, coursCandlestick),
        SizedBox(
          height: 300,
          child: coursChart.isNotEmpty
              ? Chart(
                  data: coursChart[0],
                  variables: {
                    'Date': Variable(
                      accessor: (Map map) => map['Date'] as String,
                      scale: OrdinalScale(tickCount: 3),
                    ),
                    'Valeur': Variable(
                      accessor: (Map map) =>
                          (map['Valeur'] ?? double.nan) as num,
                    ),
                  },
                  elements: [
                    AreaElement(
                      shape: ShapeAttr(value: BasicAreaShape(smooth: true)),
                      color: ColorAttr(
                          value: Defaults.colors10.first.withAlpha(75)),
                    ),
                    LineElement(
                      shape: ShapeAttr(value: BasicLineShape(smooth: true)),
                      size: SizeAttr(value: 0.5),
                    ),
                  ],
                  axes: [
                    Defaults.horizontalAxis,
                    Defaults.verticalAxis,
                  ],
                  selections: {
                    'touchMove': PointSelection(
                      on: {
                        GestureType.scaleUpdate,
                        GestureType.tapDown,
                        GestureType.longPressMoveUpdate
                      },
                      dim: Dim.x,
                    )
                  },
                  tooltip: TooltipGuide(
                    followPointer: [false, true],
                    align: Alignment.topLeft,
                    offset: const Offset(-20, -20),
                  ),
                  crosshair: CrosshairGuide(followPointer: [false, true]),
                )
              : Chart(
                  data: coursCandlestick[0],
                  variables: {
                    'time': Variable(
                      accessor: (Map datumn) => datumn['time'].toString(),
                      scale: OrdinalScale(tickCount: 4),
                    ),
                    'start': Variable(
                      accessor: (Map datumn) => datumn['start'] as num,
                      scale: LinearScale(
                          min: double.parse(
                              coursCandlestick[1][0]['absoluteMin'].toString()),
                          max: double.parse(coursCandlestick[1][0]
                                  ['absoluteMax']
                              .toString())),
                    ),
                    'max': Variable(
                      accessor: (Map datumn) => datumn['max'] as num,
                      scale: LinearScale(
                          min: double.parse(
                              coursCandlestick[1][0]['absoluteMin'].toString()),
                          max: double.parse(coursCandlestick[1][0]
                                  ['absoluteMax']
                              .toString())),
                    ),
                    'min': Variable(
                      accessor: (Map datumn) => datumn['min'] as num,
                      scale: LinearScale(
                          min: double.parse(
                              coursCandlestick[1][0]['absoluteMin'].toString()),
                          max: double.parse(coursCandlestick[1][0]
                                  ['absoluteMax']
                              .toString())),
                    ),
                    'end': Variable(
                      accessor: (Map datumn) => datumn['end'] as num,
                      scale: LinearScale(
                          min: double.parse(
                              coursCandlestick[1][0]['absoluteMin'].toString()),
                          max: double.parse(coursCandlestick[1][0]
                                  ['absoluteMax']
                              .toString())),
                    ),
                  },
                  elements: [
                    CustomElement(
                      shape: ShapeAttr(value: CandlestickShape()),
                      position: Varset('time') *
                          (Varset('start') +
                              Varset('max') +
                              Varset('min') +
                              Varset('end')),
                      color: ColorAttr(
                          encoder: (tuple) => tuple['end'] >= tuple['start']
                              ? Colors.green
                              : Colors.red),
                    )
                  ],
                  axes: [
                    Defaults.horizontalAxis,
                    Defaults.verticalAxis,
                  ],
                  coord: RectCoord(
                      horizontalRangeUpdater: Defaults.horizontalRangeSignal),
                ),
        ),
      ],
    );
  }

  Row getEvol(List<List<Map<dynamic, dynamic>>> coursChart,
      List<List<Map<dynamic, dynamic>>> coursCandlestick) {
    if (coursChart.isNotEmpty) {
      double valeur1 = coursChart[0][0]["Valeur"];
      double valeur2 = coursChart[0][coursChart[0].length - 1]["Valeur"];

      bool estCroissant = (valeur1 <= valeur2);
      double evolBrut = valeur2 - valeur1;
      double evolPercent = 0;
      if (valeur1 != 0) {
        evolPercent = (evolBrut / valeur1) * 100;
      }

      return Row(
        children: [
          estCroissant
              ? const Icon(CupertinoIcons.arrow_up_right,
                  color: Colors.green, size: 15)
              : const Icon(CupertinoIcons.arrow_down_right,
                  color: Colors.red, size: 15),
          Text(
            "${evolBrut.abs().toStringAsFixed(2)} € (${evolPercent.toStringAsFixed(2)}%)",
            style: estCroissant
                ? const TextStyle(color: Colors.green)
                : const TextStyle(color: Colors.red),
          )
        ],
      );
    } else {
      double valeur1 = coursCandlestick[0][0]["start"];
      double valeur2 =
          coursCandlestick[0][coursCandlestick[0].length - 1]["end"];

      bool estCroissant = (valeur1 <= valeur2);
      double evolBrut = valeur2 - valeur1;
      double evolPercent = 0;
      if (valeur1 != 0) {
        evolPercent = (evolBrut / valeur1) * 100;
      }

      return Row(
        children: [
          estCroissant
              ? const Icon(CupertinoIcons.arrow_up_right,
                  color: Colors.green, size: 15)
              : const Icon(CupertinoIcons.arrow_down_right,
                  color: Colors.red, size: 15),
          Text(
            "${evolBrut.abs().toStringAsFixed(2)} € (${evolPercent.toStringAsFixed(2)}%)",
            style: estCroissant
                ? const TextStyle(color: Colors.green)
                : const TextStyle(color: Colors.red),
          )
        ],
      );
    }
  }
}
