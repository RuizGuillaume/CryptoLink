module.exports = class UsersCoins {
    constructor(buying_date, buying_price, quantity, id_coins, id_user) {
        this.buying_date = buying_date
        this.buying_price = buying_price
        this.quantity = quantity
        this.id_coins = id_coins
        this.id_user = id_user
    }
}