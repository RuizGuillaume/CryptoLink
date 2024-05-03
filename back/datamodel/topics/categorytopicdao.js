const BaseDAO = require('../basedao')

module.exports = class CategoryTopicDAO extends BaseDAO {

    constructor(db) {
        super(db, "categorytopic")
    }

    getAllCategories() {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM public.categorytopic
                           ORDER BY category ASC`)
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    insert(category){
        return new Promise((resolve, reject) =>
            this.db.query(`INSERT INTO public.categorytopic(category) VALUES ($1)`, [category.category])
                .then(res => {resolve(res)})
                .catch(e => {reject(e)}))
    }
}