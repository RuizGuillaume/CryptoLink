import 'package:cryptolink/cubit/crypto_cubit.dart';
import 'package:cryptolink/screens/cryptoDetail/crypto_detail.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:top_snackbar_flutter/custom_snack_bar.dart';
import 'package:top_snackbar_flutter/top_snack_bar.dart';

import '../../../models/coin_model.dart';

class Body extends StatefulWidget {
  const Body({Key? key}) : super(key: key);

  @override
  State<Body> createState() => _BodyState();
}

class _BodyState extends State<Body> {
  @override
  void initState() {
    super.initState();

    BlocProvider.of<CryptoCubit>(context).getCoinList();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<CryptoCubit, CryptoState>(
      listener: (context, state) {
        if (state is CryptoError) {
          showTopSnackBar(
            context,
            CustomSnackBar.error(
              message: state.message,
            ),
          );
        }
      },
      builder: (context, state) {
        if (state is CryptoLoaded) {
          return buildContent(state.coinList);
        }

        return buildLoading();
      },
    );
  }

  Widget buildLoading() {
    return const Center(
      child: CircularProgressIndicator(),
    );
  }

  Widget buildContent(List<Coin> coinList) {
    return SingleChildScrollView(
      child: Row(
        children: [
          Expanded(
            flex: 2,
            child: DataTable(
              columnSpacing: 25.0,
              showCheckboxColumn: false,
              columns: const <DataColumn>[
                DataColumn(
                  label: Text(
                    'Monnaie',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                DataColumn(
                  label: Text(
                    'Prix',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                DataColumn(
                  label: Text(
                    '24h',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
              ],
              rows: <DataRow>[
                for (var coin in coinList)
                  DataRow(
                    onSelectChanged: (value) {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => CryptoDetailScreen(
                                    coinId: coin.id,
                                  )));
                    },
                    cells: <DataCell>[
                      DataCell(
                        Row(
                          //crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Container(
                              margin: const EdgeInsets.only(right: 10),
                              child: CircleAvatar(
                                radius: 17.0,
                                backgroundImage: NetworkImage(coin.image),
                                backgroundColor: Colors.transparent,
                              ),
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  coin.name,
                                  style: const TextStyle(
                                      fontWeight: FontWeight.bold),
                                ),
                                Text(coin.symbol.toUpperCase(),
                                    style: const TextStyle(color: Colors.grey)),
                              ],
                            ),
                          ],
                        ),
                      ),
                      DataCell(Text(
                        "${coin.price.toStringAsFixed(2)} €",
                      )),
                      DataCell(Row(
                        children: [
                          coin.priceChangePercentage24h < 0
                              ? const Icon(CupertinoIcons.arrow_down_right,
                                  size: 15, color: Colors.red)
                              : const Icon(CupertinoIcons.arrow_up_right,
                                  size: 15, color: Colors.green),
                          Text(
                            "${coin.priceChangePercentage24h.abs().toStringAsFixed(2)}%",
                            style: TextStyle(
                              color: coin.priceChangePercentage24h < 0
                                  ? Colors.red
                                  : Colors.green,
                            ),
                          ),
                        ],
                      )),
                    ],
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
