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
          return buildContent(context, state.cours);
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

  Widget buildContent(BuildContext context, List<Map<dynamic, dynamic>> cours) {
    return Column(
      children: [
        getEvol(cours),
        SizedBox(
          height: 300,
          child: Chart(
            data: cours,
            variables: {
              'Date': Variable(
                accessor: (Map map) => map['Date'] as String,
                scale: OrdinalScale(tickCount: 3),
              ),
              'Valeur': Variable(
                accessor: (Map map) => (map['Valeur'] ?? double.nan) as num,
              ),
            },
            elements: [
              AreaElement(
                shape: ShapeAttr(value: BasicAreaShape(smooth: true)),
                color: ColorAttr(value: Defaults.colors10.first.withAlpha(75)),
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
          ),
        ),
      ],
    );
  }

  Row getEvol(List<Map<dynamic, dynamic>> cours) {
    double valeur1 = cours[0]["Valeur"];
    double valeur2 = cours[cours.length - 1]["Valeur"];

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
