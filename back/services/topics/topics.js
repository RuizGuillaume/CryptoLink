const TopicsDAO = require("../../datamodel/topics/topicsdao")

module.exports = class TopicsService {
    constructor(db) {
        this.dao = new TopicsDAO(db)
    }

    isValid(topic){
        if(topic.title !== null && topic.title !== undefined && topic.title.trim().length !== 0) {} else { return false }
        if(topic.publish_date !== null && topic.publish_date !== undefined) {} else { return false }
        if(topic.content !== null && topic.content !== undefined && topic.content.trim().length !== 0 ) {} else { return false }
        return true
    }

    getAllTopics(id_user){
        return this.dao.getAllTopics(id_user)
    }

    getAllTopicsAdmin(){
        return this.dao.getAllTopicsAdmin()
    }

    getAllTopicsByCategory(id_categorytopic, id_user){
        return this.dao.getAllTopicsByCategory(id_categorytopic, id_user)
    }

    getTopicById(id_topic, id_user){
        return this.dao.getTopicById(id_topic, id_user)
    }

    getTopicsBySearch(search, id_user){
        return this.dao.getTopicsBySearch(search, id_user)
    }

    getTopicsBySearchAdmin(search){
        return this.dao.getTopicsBySearchAdmin(search)
    }

    insert(topic){
        return this.dao.insert(topic)
    }

    update(topic){
        return this.dao.update(topic)
    }

    delete(id_topic){
        return this.dao.delete(id_topic)
    }

}