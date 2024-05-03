const BaseDAO = require('../basedao')

module.exports = class ArticlesDAO extends BaseDAO {

    constructor(db) {
        super(db, "articles")
    }

    getAllArticles() {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo FROM public.articles T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           WHERE T0.visible = true
                           ORDER BY publish_date DESC`)
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getAllArticlesAdmin(){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo FROM public.articles T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           ORDER BY publish_date DESC`)
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getAllArticlesByIdUser(id_user) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo FROM public.articles T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           WHERE T0.id_user = $1
                           ORDER BY publish_date DESC`, [id_user])
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getLastArticles() {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo FROM public.articles T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           WHERE T0.visible = true
                           ORDER BY publish_date DESC LIMIT 6`)
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getArticlesBySearch(search) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo FROM public.articles T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           WHERE T0.visible = true AND T0.title ilike '%${search}%'`)
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getArticlesBySearchAdmin(search) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo FROM public.articles T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           WHERE T0.title ilike '%${search}%'`)
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getArticleById(id_article) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo FROM public.articles T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           WHERE id_article = $1`, [id_article])
                .then(res => {resolve(res.rows[0])})
                .catch(e => {reject(e)}))
    }

    insert(article) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO public.articles(title, publish_date, content, thumbnail, visible, id_user) VALUES ($1,$2,$3,$4,$5,$6)",
            [article.title, article.publish_date, article.content, article.thumbnail, article.visible, article.id_user])
                .then(res => {resolve(res)})
                .catch(e => {reject(e)}))
    }

    update(article) {
        return new Promise((resolve, reject) =>
            this.db.query(`UPDATE public.articles SET title = $1, publish_date = $2, content = $3, thumbnail = $4, visible = $5, id_user = $6
                           WHERE id_article = $7`,
            [article.title, article.publish_date, article.content, article.thumbnail, article.visible, article.id_user, article.id_article])
                .then(res => {resolve(res)})
                .catch(e => {reject(e)}))
    }

    delete(id_article) {
        return new Promise((resolve, reject) =>
            this.db.query(`DELETE FROM public.articles WHERE id_article = $1`, [id_article])
                .then(res => {resolve(res)})
                .catch(e => {reject(e)}))
    }
}