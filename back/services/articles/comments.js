const CommentsDAO = require("../../datamodel/articles/commentsdao")

module.exports = class CommentsService {
    constructor(db) {
        this.dao = new CommentsDAO(db)
    }

    isValid(comment){
        if(comment.comment !== null && comment.comment !== undefined && comment.comment.trim().length !== 0) {} else { return false }
        if(comment.writing_date !== null && comment.writing_date !== undefined) {} else { return false }
        return true
    }

    getCommentsByIdArticle(id_article){
        return this.dao.getCommentsByIdArticle(id_article)
    }

    getCommentsByIdArticleModerate(id_article) {
        return this.dao.getCommentsByIdArticleModerate(id_article)
    }

    getCommentById(id_comment){
        return this.dao.getCommentById(id_comment)
    }

    insert(comment){
        return this.dao.insert(comment)
    }

    update(comment){
        return this.dao.update(comment)
    }

    delete(id_comment){
        return this.dao.delete(id_comment)
    }
}