module.exports = class Topic {
    constructor(title, publish_date, content, closed, category, id_user) {
        this.title = title
        this.publish_date = publish_date
        this.content = content
        this.closed = closed
        this.category = category
        this.id_user = id_user
    }
}