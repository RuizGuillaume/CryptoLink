const BaseDAO = require('../basedao')

module.exports = class CommentsDAO extends BaseDAO {

    constructor(db) {
        super(db, "comments")
    }

    getCommentsByIdArticle(id_article) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo, T1.avatar FROM public.comments T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           WHERE T0.id_article = $1 AND T0.visible = true
                           ORDER BY writing_date DESC`, [id_article])
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getCommentsByIdArticleModerate(id_article) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo, T1.avatar FROM public.comments T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           WHERE T0.id_article = $1
                           ORDER BY writing_date DESC`, [id_article])
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getCommentById(id_comment) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo, T1.avatar FROM public.comments T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           WHERE T0.id_comment = $1`, [id_comment])
                .then(res => {resolve(res.rows[0])})
                .catch(e => {reject(e)}))
    }

    insert(comment) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO public.comments(writing_date, comment, visible, id_article, id_user) VALUES ($1,$2,$3,$4,$5)",
            [comment.writing_date, comment.comment, comment.visible, comment.id_article, comment.id_user])
                   .then(res => {resolve(res)})
                   .catch(e => {reject(e)}))
    }

    update(comment) {
        return new Promise((resolve, reject) =>
            this.db.query(`UPDATE public.comments SET comment = $1, visible = $2
                           WHERE id_comment = $3`,
            [comment.comment, comment.visible, comment.id_comment])
                   .then(res => {resolve(res)})
                   .catch(e => {reject(e)}))
    }

    delete(id_comment) {
        return new Promise((resolve, reject) =>
            this.db.query("DELETE FROM public.comments WHERE id_comment = $1", [id_comment])
                   .then(res => {resolve(res)})
                   .catch(e => {reject(e)}))
    }
}