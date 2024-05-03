const CoinsDAO = require("../datamodel/coinsdao")

module.exports = class CoinsService {
    constructor(db) {
        this.dao = new CoinsDAO(db)
    }

    isValid(coin){
        if(coin.id_coins !== null && coin.id_coins !== undefined && coin.id_coins.trim().length !== 0) {} else { return false }
        if(coin.symbol !== null && coin.symbol !== undefined && coin.symbol.trim().length !== 0 ) {} else { return false }
        if(coin.name !== null && coin.name !== undefined && coin.name.trim().length !== 0 ) {} else { return false }
        if(coin.description !== null && coin.description !== undefined && coin.description.trim().length !== 0 ) {} else { return false }
        if(coin.creation_date !== null && coin.creation_date !== undefined ) {} else { return false }
        if(coin.homepage !== null && coin.homepage !== undefined ) {} else { return false }
        return true
    }

    getAllCoins(){
        return this.dao.getAllCoins()
    }

    getCoinById(id_coins){
        return this.dao.getCoinById(id_coins)
    }

    getCoinsHomepage(){
        return this.dao.getCoinsHomepage()
    }

    insert(coins){
        return this.dao.insert(coins)
    }

    update(coins){
        return this.dao.update(coins)
    }

    delete(id_coins){
        return this.dao.delete(id_coins)
    }
}