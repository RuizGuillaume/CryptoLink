class CoinDetail {
  final String id;
  final String name;
  final String symbol;
  final String image;
  final double price;
  final String description;

  CoinDetail({
    required this.id,
    required this.symbol,
    required this.name,
    required this.image,
    required this.price,
    required this.description,
  });

  factory CoinDetail.fromJson(Map<String, dynamic> json) {
    if (json['market_data']['current_price']['eur'] == null) {
      json['market_data']['current_price']['eur'] = 0;
    }

    return CoinDetail(
        id: json['id'],
        symbol: json['symbol'],
        name: json['name'],
        image: json['image']['large'],
        price: double.parse(
            json['market_data']['current_price']['eur'].toString()),
        description: json['description']['en']);
  }

  @override
  String toString() {
    return "$name -> $price €";
  }
}
