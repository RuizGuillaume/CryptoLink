import 'package:cryptolink/repositories/crypto_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../models/coin_model.dart';

part 'crypto_state.dart';

class CryptoCubit extends Cubit<CryptoState> {
  final CryptoRepository _repository = CryptoRepository();

  CryptoCubit() : super(CryptoInitial());

  Future<void> getCoinList() async {
    try {
      emit(CryptoLoading());
      final coinList = await _repository.getListCoins();
      emit(CryptoLoaded(coinList));
    } on NetworkException catch (ex) {
      emit(CryptoError(ex.message));
    }
  }
}
