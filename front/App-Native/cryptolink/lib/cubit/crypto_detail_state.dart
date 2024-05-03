part of 'crypto_detail_cubit.dart';

@immutable
abstract class CryptoDetailState {}

class CryptoDetailInitial extends CryptoDetailState {}

class CryptoDetailLoading extends CryptoDetailState {}

class CryptoDetailLoaded extends CryptoDetailState {
  final CoinDetail coinDetail;
  CryptoDetailLoaded(this.coinDetail);
}

class CryptoDetailError extends CryptoDetailState {
  final String message;
  CryptoDetailError(this.message);
}
