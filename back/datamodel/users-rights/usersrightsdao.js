const BaseDAO = require('../basedao')

module.exports = class UsersRightsDAO extends BaseDAO {

    constructor(db) {
        super(db, "usersrights")
    }

    getAllUsersRights() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.usersrights ORDER BY id_userright ASC")
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getRightsByIdUser(id_user) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.label FROM public.usersrights T0
                           LEFT JOIN public.rights T1 on T0.id_right = T1.id_right
                           WHERE T0.id_user = $1`,[id_user])
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getRight(id_user, right) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT (COUNT(*) > 0) as right FROM public.usersrights T0
                           LEFT JOIN public.rights T1 on T0.id_right = T1.id_right
                           WHERE T0.id_user = $1 AND T1.label = $2`,[id_user, right])
                .then(res => {resolve(res.rows[0].right)})
                .catch(e => {reject(e)}))
    }

    insert(usersrights) {
        return new Promise((resolve, reject) =>
        this.db.query("INSERT INTO public.usersrights(id_user, id_right) VALUES ($1,$2)",
        [usersrights.id_user, usersrights.id_right])
        .then(res => {resolve(res)})
        .catch(e => {reject(e)}))
    }

    delete(id_user) {
        return new Promise((resolve, reject) =>
        this.db.query("DELETE FROM public.usersrights WHERE id_user=$1",
        [id_user])
        .then(res => {resolve(res)})
        .catch(e => {reject(e)}))
    }

}