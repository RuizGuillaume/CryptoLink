const BaseDAO = require('../basedao')

module.exports = class UsersCoinsDAO extends BaseDAO {

    constructor(db) {
        super(db, "userscoins")
    }

    getAllUsersCoinsByIdUser(id_user) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM public.userscoins T0
                           LEFT JOIN public.coins T1 on T0.id_coins = T1.id_coins
                           WHERE id_user = $1
						   order by buying_date asc`, [id_user])
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getUsersCoinsById(id_userscoins) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM public.userscoins T0
                           LEFT JOIN public.coins T1 on T0.id_coins = T1.id_coins
                           WHERE T0.id_userscoins = $1`, [id_userscoins])
                .then(res => {resolve(res.rows[0])})
                .catch(e => {reject(e)}))
    }

    insert(userscoins) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO public.userscoins(buying_date, buying_price, quantity, id_coins, id_user) VALUES ($1,$2,$3,$4,$5)",
            [userscoins.buying_date, userscoins.buying_price, userscoins.quantity, userscoins.id_coins, userscoins.id_user])
                .then(res => {resolve(res)})
                .catch(e => {reject(e)}))
    }

    update(userscoins) {
        return new Promise((resolve, reject) =>
        this.db.query(`UPDATE public.userscoins SET buying_date=$1, buying_price=$2, quantity=$3, id_coins=$4
                       WHERE id_userscoins=$5`,
        [userscoins.buying_date, userscoins.buying_price, userscoins.quantity, userscoins.id_coins, userscoins.id_userscoins])
            .then(res => {resolve(res)})
            .catch(e => {reject(e)}))
    }

    delete(id_userscoins) {
        return new Promise((resolve, reject) =>
            this.db.query(`DELETE FROM public.userscoins WHERE id_userscoins = $1`, [id_userscoins])
                .then(res => {resolve(res)})
                .catch(e => {reject(e)}))
    }

}