const BaseDAO = require('../basedao')

module.exports = class PostsDAO extends BaseDAO {

    constructor(db) {
        super(db, "posts")
    }

    getPostsByIdTopic(id_topic) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo, T1.avatar FROM public.posts T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           WHERE T0.id_topic = $1 AND T0.visible = true
                           ORDER BY writing_date ASC`, [id_topic])
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getPostsByIdTopicModerate(id_topic) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo, T1.avatar FROM public.posts T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           WHERE T0.id_topic = $1
                           ORDER BY writing_date ASC`, [id_topic])
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getPostById(id_post) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.pseudo, T1.avatar FROM public.posts T0
                           LEFT JOIN public.users T1 on T0.id_user = T1.id_user
                           WHERE T0.id_post = $1`, [id_post])
                .then(res => {resolve(res.rows[0])})
                .catch(e => {reject(e)}))
    }

    insert(post) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO public.posts(writing_date, post, visible, id_topic, id_user) VALUES ($1,$2,$3,$4,$5)",
            [post.writing_date, post.post, post.visible, post.id_topic, post.id_user])
                   .then(res => {resolve(res)})
                   .catch(e => {reject(e)}))
    }

    update(post) {
        return new Promise((resolve, reject) =>
            this.db.query(`UPDATE public.posts SET post = $1, visible = $2
                           WHERE id_post = $3`,
            [post.post, post.visible, post.id_post])
                   .then(res => {resolve(res)})
                   .catch(e => {reject(e)}))
    }

    delete(id_post) {
        return new Promise((resolve, reject) =>
            this.db.query("DELETE FROM public.posts WHERE id_post = $1", [id_post])
                   .then(res => {resolve(res)})
                   .catch(e => {reject(e)}))
    }
}