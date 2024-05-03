import 'package:cryptolink/cubit/graph_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:graphic/graphic.dart';

class RadioGraphVue extends StatefulWidget {
  final String? coinId;
  const RadioGraphVue({Key? key, this.coinId}) : super(key: key);

  @override
  State<RadioGraphVue> createState() => _RadioGraphVueState();
}

class _RadioGraphVueState extends State<RadioGraphVue> {
  @override
  void initState() {
    super.initState();

    BlocProvider.of<GraphCubit>(context)
        .getGraph(VueGraph.jour, widget.coinId, TypeGraph.chart);
  }

  late List<bool> isSelectedVue = [true, false, false, false, false, false];
  late List<bool> isSelectedType = [true, false];
  late int selectedVue = 0;
  late int selectedType = 0;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          flex: 5,
          child: Container(
            margin: const EdgeInsets.only(top: 10, bottom: 30),
            height: 40,
            child: Center(
              child: ToggleButtons(
                constraints: const BoxConstraints(
                  minWidth: 40,
                  minHeight: 40,
                ),
                fillColor: Defaults.colors10.first.withAlpha(75),
                borderRadius: BorderRadius.circular(10),
                borderWidth: 2,
                isSelected: isSelectedVue,
                // ignore: prefer_const_literals_to_create_immutables
                children: <Widget>[
                  const Text("1J"),
                  const Text("1S"),
                  const Text("1M"),
                  const Text("6M"),
                  const Text("1A"),
                  const Text("All"),
                ],
                onPressed: (int index) {
                  selectedVue = index;
                  setState(() {
                    for (int buttonIndex = 0;
                        buttonIndex < isSelectedVue.length;
                        buttonIndex++) {
                      if (buttonIndex == index) {
                        isSelectedVue[buttonIndex] = true;
                      } else {
                        isSelectedVue[buttonIndex] = false;
                      }
                    }
                  });
                  TypeGraph typeGraph = TypeGraph.chart;
                  switch (selectedType) {
                    case 0:
                      typeGraph = TypeGraph.chart;
                      break;
                    case 1:
                      typeGraph = TypeGraph.candlestick;
                      break;
                    default:
                  }
                  switch (index) {
                    case 0:
                      BlocProvider.of<GraphCubit>(context)
                          .getGraph(VueGraph.jour, widget.coinId, typeGraph);
                      break;
                    case 1:
                      BlocProvider.of<GraphCubit>(context)
                          .getGraph(VueGraph.semaine, widget.coinId, typeGraph);
                      break;
                    case 2:
                      BlocProvider.of<GraphCubit>(context)
                          .getGraph(VueGraph.mois, widget.coinId, typeGraph);
                      break;
                    case 3:
                      BlocProvider.of<GraphCubit>(context)
                          .getGraph(VueGraph.mois6, widget.coinId, typeGraph);
                      break;
                    case 4:
                      BlocProvider.of<GraphCubit>(context)
                          .getGraph(VueGraph.annee, widget.coinId, typeGraph);
                      break;
                    case 5:
                      BlocProvider.of<GraphCubit>(context)
                          .getGraph(VueGraph.all, widget.coinId, typeGraph);
                      break;
                    default:
                  }
                },
              ),
            ),
          ),
        ),
        Expanded(
          flex: 2,
          child: Container(
            margin: const EdgeInsets.only(top: 10, bottom: 30),
            height: 40,
            child: Center(
              child: ToggleButtons(
                fillColor: Defaults.colors10.first.withAlpha(75),
                borderRadius: BorderRadius.circular(10),
                borderWidth: 2,
                isSelected: isSelectedType,
                // ignore: prefer_const_literals_to_create_immutables
                children: <Widget>[
                  const Icon(Icons.show_chart),
                  const Icon(Icons.candlestick_chart),
                ],
                onPressed: (int index) {
                  selectedType = index;
                  setState(() {
                    for (int buttonIndex = 0;
                        buttonIndex < isSelectedType.length;
                        buttonIndex++) {
                      if (buttonIndex == index) {
                        isSelectedType[buttonIndex] = true;
                      } else {
                        isSelectedType[buttonIndex] = false;
                      }
                    }
                  });
                  VueGraph vueGraph = VueGraph.jour;
                  switch (selectedVue) {
                    case 0:
                      vueGraph = VueGraph.jour;
                      break;
                    case 1:
                      vueGraph = VueGraph.semaine;
                      break;
                    case 2:
                      vueGraph = VueGraph.mois;
                      break;
                    case 3:
                      vueGraph = VueGraph.mois6;
                      break;
                    case 4:
                      vueGraph = VueGraph.annee;
                      break;
                    case 5:
                      vueGraph = VueGraph.all;
                      break;
                    default:
                  }
                  switch (index) {
                    case 0:
                      BlocProvider.of<GraphCubit>(context)
                          .getGraph(vueGraph, widget.coinId, TypeGraph.chart);
                      break;
                    case 1:
                      BlocProvider.of<GraphCubit>(context).getGraph(
                          vueGraph, widget.coinId, TypeGraph.candlestick);
                      break;
                    default:
                  }
                },
              ),
            ),
          ),
        ),
      ],
    );
  }
}
