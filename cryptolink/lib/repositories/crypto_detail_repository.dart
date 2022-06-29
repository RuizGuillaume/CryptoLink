import 'dart:convert';
import 'dart:io';

import 'package:cryptolink/models/coin_detail_model.dart';
import 'package:cryptolink/utils/constants.dart';
import 'package:http/http.dart' as http;

class CryptoDetailRepository {
  Future<CoinDetail> getCoinDetail(String coinId) async {
    await Future.delayed(const Duration(milliseconds: kDelayQuery));

    Map<String, String> queryParams = {
      "localization": "false",
      "tickers": 'false',
      "market_data": 'true',
      "community_data": 'false',
      "developer_data": 'false',
      "sparkline": 'false',
    };

    final uri =
        Uri.https(kServerCoinGecko, "/api/v3/coins/$coinId", queryParams);

    final response = await http.get(uri, headers: {
      HttpHeaders.contentTypeHeader: 'application/json',
    });
    if (response.statusCode == 200) {
      var jsonCoinDetail = jsonDecode(response.body);
      CoinDetail coinDetail = CoinDetail.fromJson(jsonCoinDetail);

      return coinDetail;
    } else {
      throw const NetworkException("Une erreur de connexion est survenue");
    }
  }
}

class NetworkException implements Exception {
  final String message;
  const NetworkException(this.message);
}
