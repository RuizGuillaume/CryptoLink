module.exports = class Comments {
    constructor(writing_date, comment, visible, id_article, id_user) {
        this.writing_date = writing_date
        this.comment = comment
        this.visible = visible
        this.id_article = id_article
        this.id_user = id_user
    }
}