import 'dart:convert';
import 'dart:io';

import 'package:intl/intl.dart';

import '../cubit/graph_cubit.dart';
import '../utils/constants.dart';
import 'package:http/http.dart' as http;

class GraphRepository {
  Future<List<Map<dynamic, dynamic>>> getGraph(
      VueGraph vueGraph, String? coinId) async {
    await Future.delayed(const Duration(milliseconds: kDelayQuery));

    String timestampFrom = getTimestamp(vueGraph);
    String timestampTo =
        (DateTime.now().millisecondsSinceEpoch).toString().substring(0, 10);

    Map<String, String> queryCoursParams = {
      "vs_currency": "eur",
      "from": timestampFrom,
      "to": timestampTo,
    };

    final uri = Uri.https(kServerCoinGecko,
        "/api/v3/coins/$coinId/market_chart/range", queryCoursParams);

    final response = await http.get(uri, headers: {
      HttpHeaders.contentTypeHeader: 'application/json',
    });

    if (response.statusCode == 200) {
      Map<String, dynamic> jsonCoursCoin = jsonDecode(response.body);

      List<Map<dynamic, dynamic>> coursCoin = [];

      for (int i = 0; i < jsonCoursCoin["prices"].length; i++) {
        int timestamp = jsonCoursCoin["prices"][i][0];
        double value = jsonCoursCoin["prices"][i][1];

        DateTime dateTime =
            DateTime.fromMicrosecondsSinceEpoch(timestamp * 1000);
        String date = DateFormat('dd/MM/yyyy HH:mm').format(dateTime);

        Map<dynamic, dynamic> point = {
          'Date': date,
          "Valeur": double.parse(value.toStringAsFixed(2))
        };

        coursCoin.insert(i, point);
      }
      return coursCoin;
    } else {
      throw const NetworkException("Une erreur de connexion est survenue");
    }
  }

  String getTimestamp(VueGraph vueGraph) {
    DateTime dateTimeNow = DateTime.now();
    int timestamp = 0;

    switch (vueGraph) {
      case VueGraph.jour:
        timestamp = dateTimeNow
            .subtract(const Duration(days: 1))
            .millisecondsSinceEpoch;
        break;
      case VueGraph.semaine:
        timestamp = dateTimeNow
            .subtract(const Duration(days: 7))
            .millisecondsSinceEpoch;
        break;
      case VueGraph.mois:
        timestamp = dateTimeNow
            .subtract(const Duration(days: 30))
            .millisecondsSinceEpoch;
        break;
      case VueGraph.mois6:
        timestamp = dateTimeNow
            .subtract(const Duration(days: 180))
            .millisecondsSinceEpoch;
        break;
      case VueGraph.annee:
        timestamp = dateTimeNow
            .subtract(const Duration(days: 365))
            .millisecondsSinceEpoch;
        break;
      default:
        break;
    }
    //On enleve les milliseconds du timstamp
    return (timestamp / 1000).toString().split(".")[0];
  }
}

class NetworkException implements Exception {
  final String message;
  const NetworkException(this.message);
}
