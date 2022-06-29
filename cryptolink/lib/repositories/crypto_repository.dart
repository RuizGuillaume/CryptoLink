import 'dart:convert';
import 'dart:io';

import 'package:cryptolink/models/coin_model.dart';
import 'package:cryptolink/utils/constants.dart';
import 'package:http/http.dart' as http;

class CryptoRepository {
  Future<List<Coin>> getListCoins() async {
    await Future.delayed(const Duration(milliseconds: kDelayQuery));

    Map<String, String> queryParams = {
      "vs_currency": "eur",
      "order": "market_cap_desc",
      "per_page": '50',
      "page": '1',
      "sparkline": 'false',
    };

    final uri =
        Uri.https(kServerCoinGecko, "/api/v3/coins/markets", queryParams);

    final response = await http.get(uri, headers: {
      HttpHeaders.contentTypeHeader: 'application/json',
    });

    if (response.statusCode == 200) {
      List<Coin> coinList = [];

      var jsonCoinList = jsonDecode(response.body);

      for (var jsonCoin in jsonCoinList) {
        coinList.add(Coin.fromJson(jsonCoin));
      }
      return coinList;
    } else {
      throw const NetworkException("Une erreur de connexion est survenue");
    }
  }
}

class NetworkException implements Exception {
  final String message;
  const NetworkException(this.message);
}
