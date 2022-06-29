import 'package:cryptolink/models/coin_detail_model.dart';
import 'package:cryptolink/repositories/crypto_detail_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../models/coin_detail_model.dart';

part 'crypto_detail_state.dart';

class CryptoDetailCubit extends Cubit<CryptoDetailState> {
  final CryptoDetailRepository _repository = CryptoDetailRepository();
  String coinId;

  CryptoDetailCubit(this.coinId) : super(CryptoDetailInitial());

  Future<void> getCoinDetail() async {
    try {
      emit(CryptoDetailLoading());
      final coinDetail = await _repository.getCoinDetail(coinId);
      emit(CryptoDetailLoaded(coinDetail));
    } on NetworkException catch (ex) {
      emit(CryptoDetailError(ex.message));
    }
  }
}
