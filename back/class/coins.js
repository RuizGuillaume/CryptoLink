module.exports = class Coins {
    constructor(id_coins, symbol, name, description, creation_date, logo, homepage) {
        this.id_coins = id_coins
        this.symbol = symbol
        this.name = name
        this.description = description
        this.creation_date = creation_date
        this.logo = logo
        this.homepage = homepage
    }
}