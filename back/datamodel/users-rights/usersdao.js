const BaseDAO = require('../basedao')

module.exports = class UsersDAO extends BaseDAO {

    constructor(db) {
        super(db, "users")
    }

    getAllUsers() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT id_user, email, pseudo, avatar, disable FROM public.users ORDER BY id_user ASC")
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getAllUsersAdmin(){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT email FROM public.users T0
                           LEFT JOIN public.usersrights T1 on T0.id_user = T1.id_user
                           WHERE T1.id_right = 4 AND T0.disable = false
                           ORDER BY T0.id_user ASC`)
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getUserById(id_user) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.users WHERE id_user = $1 ORDER BY id_user ASC", [id_user])
                .then(res => {resolve(res.rows[0])})
                .catch(e => {reject(e)}))
    }

    getUserByEmail(email) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.users WHERE email = $1 and disable = false", [email])
                .then(res => {resolve(res.rows[0])})
                .catch(e => {reject(e)}))
    }

    insert(user) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO public.users(email, password, pseudo, avatar, disable) VALUES ($1,$2,$3,$4,$5) RETURNING id_user;",
            [user.email, user.password, user.pseudo, user.avatar, user.disable])
                   .then(res => {resolve(res.rows[0].id_user)})
                   .catch(e => {reject(e)}))
    }

    update(user, id_user) {
        return this.db.query(`UPDATE public.users SET email = $1 , password = $2, pseudo = $3, avatar = $4, disable = $5
                              WHERE id_user = $6`,
        [user.email, user.password, user.pseudo, user.avatar, user.disable, id_user])
    }

}