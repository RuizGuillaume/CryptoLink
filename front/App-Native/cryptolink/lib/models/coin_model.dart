class Coin {
  final String id;
  final String symbol;
  final String name;
  final String image;
  final double price;
  final double priceChange24h;
  final double priceChangePercentage24h;

  const Coin({
    required this.id,
    required this.symbol,
    required this.name,
    required this.image,
    required this.price,
    required this.priceChange24h,
    required this.priceChangePercentage24h,
  });

  factory Coin.fromJson(Map<String, dynamic> json) {

    if (json['current_price'] == null){
        json['current_price'] = 0;
    }
    if (json['price_change_24h'] == null){
        json['price_change_24h'] = 0;
    }
    if (json['price_change_percentage_24h'] == null){
        json['price_change_percentage_24h'] = 0;
    }

    return Coin(
      id: json['id'],
      symbol: json['symbol'],
      name: json['name'],
      image: json['image'],
      price: double.parse(json['current_price'].toString()),
      priceChange24h: double.parse(json['price_change_24h'].toString()),
      priceChangePercentage24h:
          double.parse(json['price_change_percentage_24h'].toString()),
    );
  }

  @override
  String toString() {
    return "$name -> $price €";
  }
}
