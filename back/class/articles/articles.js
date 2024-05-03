module.exports = class Articles {
    constructor(title, publish_date, content, thumbnail, visible, id_user) {
        this.title = title
        this.publish_date = publish_date
        this.content = content
        this.thumbnail = thumbnail
        this.visible = visible
        this.id_user = id_user
    }
}