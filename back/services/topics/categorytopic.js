const CategoryTopicDAO = require("../../datamodel/topics/categorytopicdao")

module.exports = class CategoryTopicService {
    constructor(db) {
        this.dao = new CategoryTopicDAO(db)
    }

    getAllCategories(){
        return this.dao.getAllCategories()
    }

    insert(category){
        return this.dao.insert(category)
    }

}