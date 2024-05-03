import 'package:cryptolink/cubit/crypto_detail_cubit.dart';
import 'package:cryptolink/cubit/graph_cubit.dart';
import 'package:cryptolink/models/coin_detail_model.dart';
import 'package:cryptolink/screens/cryptoDetail/components/radio_graph_vue.dart';
import 'package:cryptolink/utils/constants.dart';
import 'package:drop_cap_text/drop_cap_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';
import 'package:top_snackbar_flutter/custom_snack_bar.dart';
import 'package:top_snackbar_flutter/top_snack_bar.dart';

import 'graph.dart';

class Body extends StatefulWidget {
  const Body({Key? key}) : super(key: key);

  @override
  State<Body> createState() => _BodyState();
}

class _BodyState extends State<Body> {
  @override
  void initState() {
    super.initState();

    BlocProvider.of<CryptoDetailCubit>(context).getCoinDetail();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<CryptoDetailCubit, CryptoDetailState>(
      listener: (context, state) {
        if (state is CryptoDetailError) {
          showTopSnackBar(
            context,
            CustomSnackBar.error(
              message: state.message,
            ),
          );
        }
      },
      builder: (context, state) {
        if (state is CryptoDetailLoaded) {
          return buildContent(state.coinDetail);
        }
        return buildLoading();
      },
    );
  }

  Widget buildLoading() {
    return Container(
      color: Colors.white,
      child: const Center(
        child: CircularProgressIndicator(),
      ),
    );
  }

  Widget buildContent(CoinDetail coinDetail) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("CryptoLink"),
          backgroundColor: kPrimaryColor,
        ),
        body: ListView(
          shrinkWrap: true,
          padding: const EdgeInsets.all(10),
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.only(bottom: 5),
              child: Text(
                "${coinDetail.name} (${coinDetail.symbol.toUpperCase()})",
                style: const TextStyle(
                    fontWeight: FontWeight.bold, color: Colors.grey),
              ),
            ),
            Text(
              "${coinDetail.price} €",
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 40,
              ),
            ),
            BlocProvider(
              create: (context) => GraphCubit(),
              child: Column(
                children: [
                  Graph(coinId: coinDetail.id),
                  RadioGraphVue(coinId: coinDetail.id),
                ],
              ),
            ),
            DropCapText(
              Bidi.stripHtmlIfNeeded(coinDetail.description),
              dropCapPadding: const EdgeInsets.all(10),
              dropCap: DropCap(
                width: 75,
                height: 75,
                child: CircleAvatar(
                  backgroundImage: NetworkImage(coinDetail.image),
                  backgroundColor: Colors.transparent,
                ),
              ),
            ),
          ],
        ));
  }
}
