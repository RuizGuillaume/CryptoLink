const BaseDAO = require('../basedao')

module.exports = class TopicsDAO extends BaseDAO {

    constructor(db) {
        super(db, "topics")
    }

    getAllTopics(id_user) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.category as category_name, T2.pseudo, T2.avatar, T2.id_user = $1 as is_owned FROM public.topics T0
                           LEFT JOIN public.categorytopic T1 on T0.category = T1.id_categorytopic
                           LEFT JOIN public.users T2 on T0.id_user = T2.id_user
                           ORDER BY publish_date DESC` , [id_user])
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getAllTopicsAdmin() {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.category as category_name, T2.pseudo, T2.avatar FROM public.topics T0
                           LEFT JOIN public.categorytopic T1 on T0.category = T1.id_categorytopic
                           LEFT JOIN public.users T2 on T0.id_user = T2.id_user
                           ORDER BY publish_date DESC`)
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }    

    getAllTopicsByCategory(id_categorytopic , id_user) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.category as category_name , T2.pseudo, T2.avatar, T2.id_user = $2 as is_owned FROM public.topics T0
                           LEFT JOIN public.categorytopic T1 on T0.category = T1.id_categorytopic
                           LEFT JOIN public.users T2 on T0.id_user = T2.id_user
                           WHERE T0.category = $1
                           ORDER BY publish_date DESC`, [id_categorytopic , id_user])
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getTopicById(id_topic , id_user){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.category as category_name , T2.pseudo, T2.avatar, T2.id_user = $2 as is_owned FROM public.topics T0
                           LEFT JOIN public.categorytopic T1 on T0.category = T1.id_categorytopic
                           LEFT JOIN public.users T2 on T0.id_user = T2.id_user
                           WHERE T0.id_topic = $1`, [id_topic , id_user])
                .then(res => {resolve(res.rows[0])})
                .catch(e => {reject(e)}))
    }

    getTopicsBySearch(search , id_user){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.category as category_name, T2.pseudo, T2.avatar, T2.id_user = $1 as is_owned FROM public.topics T0
                           LEFT JOIN public.categorytopic T1 on T0.category = T1.id_categorytopic
                           LEFT JOIN public.users T2 on T0.id_user = T2.id_user
                           WHERE T0.title ilike '%${search}%'` , [id_user] )
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getTopicsBySearchAdmin(search){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT T0.*, T1.category as category_name, T2.pseudo, T2.avatar FROM public.topics T0
                           LEFT JOIN public.categorytopic T1 on T0.category = T1.id_categorytopic
                           LEFT JOIN public.users T2 on T0.id_user = T2.id_user
                           WHERE T0.title ilike '%${search}%'`)
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    insert(topic) {
        return new Promise((resolve, reject) =>
            this.db.query(`INSERT INTO public.topics(title, publish_date, content, closed, category, id_user) VALUES ($1,$2,$3,$4,$5,$6)`
                          , [topic.title, topic.publish_date, topic.content, topic.closed, topic.category, topic.id_user])
                .then(res => {resolve(res)})
                .catch(e => {reject(e)}))
    }

    update(topic) {
        return new Promise((resolve, reject) =>
            this.db.query(`UPDATE public.topics SET title = $1, publish_date = $2, content = $3, closed = $4, category = $5, id_user = $6
                           WHERE id_topic = $7`, [topic.title, topic.publish_date, topic.content, topic.closed, topic.category, topic.id_user, topic.id_topic])
                .then(res => {resolve(res)})
                .catch(e => {reject(e)}))
    }

    delete(id_topic) {
        return new Promise((resolve, reject) =>
            this.db.query(`DELETE FROM public.topics WHERE id_topic = $1`, [id_topic])
                .then(res => {resolve(res)})
                .catch(e => {reject(e)}))
    }
}