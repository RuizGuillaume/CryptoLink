const BaseDAO = require('./basedao')

module.exports = class WebsitesDAO extends BaseDAO {

    constructor(db) {
        super(db, "websites")
    }

    getAllWebsites(){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo FROM public.websites T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           ORDER BY url ASC`)
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getWebisteById(id_website){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo FROM public.websites T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           WHERE id_website = $1
                           ORDER BY url ASC`, [id_website])
                .then(res => {resolve(res.rows[0])})
                .catch(e => {reject(e)}))
    }

    getWebsiteBySearch(search){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo FROM public.websites T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           WHERE url ilike '%${search}%'
                           ORDER BY url ASC`)
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    insert(website){
        return new Promise((resolve, reject) =>
            this.db.query(`INSERT INTO public.websites(url, fraudulent, id_user) VALUES ($1,$2,$3)`
                        , [website.url, website.fraudulent, website.id_user])
                .then(res => {resolve(res)})
                .catch(e => {reject(e)}))
    }

    update(website){
        return new Promise((resolve, reject) =>
            this.db.query(`UPDATE public.websites SET url = $1, fraudulent = $2, id_user = $3
                           WHERE id_website = $4`
                        , [website.url, website.fraudulent, website.id_user, website.id_website])
                .then(res => {resolve(res)})
                .catch(e => {reject(e)}))
    }

    delete(id_website){
        return new Promise((resolve, reject) =>
            this.db.query(`DELETE FROM public.websites
                           WHERE id_website = $1`, [id_website])
                .then(res => {resolve(res)})
                .catch(e => {reject(e)}))
    }
}