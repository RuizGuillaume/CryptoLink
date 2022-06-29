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

    BlocProvider.of<GraphCubit>(context).getGraph(VueGraph.jour, widget.coinId);
  }

  late List<bool> isSelected = [true, false, false, false, false, false];

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 10, bottom: 30),
      height: 40,
      child: Center(
        child: ToggleButtons(
          fillColor: Defaults.colors10.first.withAlpha(75),
          borderRadius: BorderRadius.circular(10),
          borderWidth: 2,
          isSelected: isSelected,
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
            setState(() {
              for (int buttonIndex = 0;
                  buttonIndex < isSelected.length;
                  buttonIndex++) {
                if (buttonIndex == index) {
                  isSelected[buttonIndex] = true;
                } else {
                  isSelected[buttonIndex] = false;
                }
              }
            });
            switch (index) {
              case 0:
                BlocProvider.of<GraphCubit>(context)
                    .getGraph(VueGraph.jour, widget.coinId);
                break;
              case 1:
                BlocProvider.of<GraphCubit>(context)
                    .getGraph(VueGraph.semaine, widget.coinId);
                break;
              case 2:
                BlocProvider.of<GraphCubit>(context)
                    .getGraph(VueGraph.mois, widget.coinId);
                break;
              case 3:
                BlocProvider.of<GraphCubit>(context)
                    .getGraph(VueGraph.mois6, widget.coinId);
                break;
              case 4:
                BlocProvider.of<GraphCubit>(context)
                    .getGraph(VueGraph.annee, widget.coinId);
                break;
              case 5:
                BlocProvider.of<GraphCubit>(context)
                    .getGraph(VueGraph.all, widget.coinId);
                break;
              default:
            }
          },
        ),
      ),
    );
  }
}
