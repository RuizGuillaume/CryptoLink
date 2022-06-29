import 'package:cryptolink/cubit/crypto_cubit.dart';
import 'package:cryptolink/screens/cryptos/components/body.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class CryptosScreen extends StatelessWidget {
  const CryptosScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => CryptoCubit(),
      child: const Body(),
    );
  }
}
