const PostsDAO = require("../../datamodel/topics/postsdao")

module.exports = class PostsService {
    constructor(db) {
        this.dao = new PostsDAO(db)
    }

    isValid(post){
        if(post.post !== null && post.post !== undefined && post.post.trim().length !== 0) {} else { return false }
        if(post.writing_date !== null && post.writing_date !== undefined) {} else { return false }
        return true
    }

    getPostsByIdTopic(id_topic){
        return this.dao.getPostsByIdTopic(id_topic)
    }

    getPostsByIdTopicModerate(id_topic){
        return this.dao.getPostsByIdTopicModerate(id_topic)
    }

    getPostById(id_post){
        return this.dao.getPostById(id_post)
    }

    insert(post){
        return this.dao.insert(post)
    }

    update(post){
        return this.dao.update(post)
    }

    delete(id_post){
        return this.dao.delete(id_post)
    }
}