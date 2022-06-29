import 'package:cryptolink/cubit/crypto_detail_cubit.dart';
import 'package:cryptolink/screens/cryptoDetail/components/body.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class CryptoDetailScreen extends StatelessWidget {
  final String coinId;

  const CryptoDetailScreen({Key? key, required this.coinId}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => CryptoDetailCubit(coinId),
      child: const Body(),
    );
  }
}
