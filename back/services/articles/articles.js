const ArticlesDAO = require("../../datamodel/articles/articlesdao")

module.exports = class ArticlesService {
    constructor(db) {
        this.dao = new ArticlesDAO(db)
    }

    isValid(article){
        if(article.title !== null && article.title !== undefined && article.title.trim().length !== 0) {} else { return false }
        if(article.publish_date !== null && article.publish_date !== undefined) {} else { return false }
        if(article.content !== null && article.content !== undefined && article.content.trim().length !== 0 ) {} else { return false }
        return true
    }

    getAllArticles(){
        return this.dao.getAllArticles()
    }

    getAllArticlesAdmin(){
        return this.dao.getAllArticlesAdmin()
    }

    getAllArticlesByIdUser(id_user){
        return this.dao.getAllArticlesByIdUser(id_user)
    }

    getLastArticles(){
        return this.dao.getLastArticles()
    }

    getArticlesBySearch(search){
        return this.dao.getArticlesBySearch(search)
    }

    getArticlesBySearchAdmin(search){
        return this.dao.getArticlesBySearchAdmin(search)
    }

    getArticleById(id_article){
        return this.dao.getArticleById(id_article)
    }

    insert(article){
        return this.dao.insert(article)
    }

    update(article){
        return this.dao.update(article)
    }

    delete(id_article){
        return this.dao.delete(id_article)
    }
}