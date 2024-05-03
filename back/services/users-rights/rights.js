const RightsDAO = require("../../datamodel/users-rights/rightsdao")

module.exports = class RightsService {
    constructor(db) {
        this.dao = new RightsDAO(db)
    }

    async getAllRights(){
        return this.dao.getAllRights()
    }

    async insert(rights){
        return this.dao.insert(rights)
    }

}