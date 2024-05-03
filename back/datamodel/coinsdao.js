const BaseDAO = require('./basedao')

module.exports = class CoinsDAO extends BaseDAO {

    constructor(db) {
        super(db, "coins")
    }

    getAllCoins() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.coins ORDER BY id_coins ASC")
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getCoinById(id_coins) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.coins WHERE id_coins = $1 ORDER BY id_coins ASC", [id_coins])
                .then(res => {resolve(res.rows[0])})
                .catch(e => {reject(e)}))
    }

    getCoinsHomepage() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.coins WHERE homepage = true ORDER BY id_coins ASC")
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    insert(coins) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO public.coins(id_coins, symbol, name, description, creation_date, logo, homepage) VALUES ($1,$2,$3,$4,$5,$6,$7)",
            [coins.id_coins, coins.symbol, coins.name, coins.description, coins.creation_date, coins.logo, coins.homepage])
                .then(res => {resolve(res)})
                .catch(e => {reject(e)}))
    }

    update(coins) {
        return new Promise((resolve, reject) =>
            this.db.query(`UPDATE public.coins SET symbol = $1, name = $2, description = $3, creation_date = $4, logo = $5, homepage = $6
                           WHERE id_coins = $7`,
            [coins.symbol, coins.name, coins.description, coins.creation_date, coins.logo, coins.homepage, coins.id_coins])
                .then(res => {resolve(res)})
                .catch(e => {reject(e)}))
    }

    delete(id_coins) {
        return new Promise((resolve, reject) =>
            this.db.query(`DELETE FROM public.coins WHERE id_coins = $1`, [id_coins])
                .then(res => {resolve(res)})
                .catch(e => {reject(e)}))
    }

}