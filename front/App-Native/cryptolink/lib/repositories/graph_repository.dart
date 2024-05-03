import 'dart:convert';
import 'dart:io';

import 'package:intl/intl.dart';

import '../cubit/graph_cubit.dart';
import '../utils/constants.dart';
import 'package:http/http.dart' as http;

class GraphRepository {
  Future<List<List<Map<dynamic, dynamic>>>> getGraph(
      VueGraph vueGraph, String? coinId, TypeGraph typeGraph) async {
    await Future.delayed(const Duration(milliseconds: kDelayQuery));
    switch (typeGraph) {
      case TypeGraph.chart:
        return getGraphChart(vueGraph, coinId);

      case TypeGraph.candlestick:
        return getGraphCandlestick(vueGraph, coinId);

      default:
        return getGraphChart(vueGraph, coinId);
    }
  }

  Future<List<List<Map>>> getGraphChart(
      VueGraph vueGraph, String? coinId) async {
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

      List<List<Map<dynamic, dynamic>>> coursCoin = [[]];

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

        coursCoin[0].insert(i, point);
      }

      return coursCoin;
    } else {
      throw const NetworkException("Une erreur de connexion est survenue");
    }
  }

  Future<List<List<Map>>> getGraphCandlestick(
      VueGraph vueGraph, String? coinId) async {
    String days = "1";
    switch (vueGraph) {
      case VueGraph.jour:
        days = "1";
        break;
      case VueGraph.semaine:
        days = "7";
        break;
      case VueGraph.mois:
        days = "30";
        break;
      case VueGraph.mois6:
        days = "180";
        break;
      case VueGraph.annee:
        days = "365";
        break;
      case VueGraph.all:
        days = "max";
        break;

      default:
        days = "1";
    }

    Map<String, String> queryCoursParams = {
      "vs_currency": "eur",
      "days": days,
    };

    final uri = Uri.https(
        kServerCoinGecko, "/api/v3/coins/$coinId/ohlc", queryCoursParams);

    final response = await http.get(uri, headers: {
      HttpHeaders.contentTypeHeader: 'application/json',
    });

    if (response.statusCode == 200) {
      List<dynamic> jsonCoursCoin = jsonDecode(response.body);

      List<List<Map<dynamic, dynamic>>> coursCoin = [[]];
      coursCoin.add([]);

      double absoluteMin = jsonCoursCoin[0][3];
      double absoluteMax = jsonCoursCoin[0][2];

      for (int i = 0; i < jsonCoursCoin.length; i++) {
        int timestamp = jsonCoursCoin[i][0];
        double start = jsonCoursCoin[i][1];
        double max = jsonCoursCoin[i][2];
        double min = jsonCoursCoin[i][3];
        double end = jsonCoursCoin[i][4];

        if (min < absoluteMin) {
          absoluteMin = min;
        }
        if (max > absoluteMax) {
          absoluteMax = max;
        }

        DateTime dateTime =
            DateTime.fromMicrosecondsSinceEpoch(timestamp * 1000);
        String date = DateFormat('dd/MM/yyyy HH:mm').format(dateTime);

        Map<dynamic, dynamic> point = {
          'time': date,
          'start': double.parse(start.toStringAsFixed(2)),
          'max': double.parse(max.toStringAsFixed(2)),
          'min': double.parse(min.toStringAsFixed(2)),
          'end': double.parse(end.toStringAsFixed(2)),
        };
        coursCoin[0].insert(i, point);
      }
      Map<dynamic, dynamic> minMax = {
        'absoluteMin': absoluteMin,
        'absoluteMax': absoluteMax,
      };
      coursCoin[1].insert(0, minMax);

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
