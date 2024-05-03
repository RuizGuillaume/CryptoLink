const BaseDAO = require('../basedao')

module.exports = class RightsDAO extends BaseDAO {

    constructor(db) {
        super(db, "rights")
    }

    getAllRights() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.rights")
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    insert(rights) {
        return this.db.query("INSERT INTO public.rights(label) VALUES ($1)",
        [rights.label])
    }

}