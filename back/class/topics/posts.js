module.exports = class Posts {
    constructor(writing_date, post, visible, id_topic, id_user) {
        this.writing_date = writing_date
        this.post = post
        this.visible = visible
        this.id_topic = id_topic
        this.id_user = id_user
    }
}