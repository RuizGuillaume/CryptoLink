const UsersRightsDAO = require("../../datamodel/users-rights/usersrightsdao")

module.exports = class UsersRightsService {
    constructor(db) {
        this.dao = new UsersRightsDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }

    async getRightsByIdUser(id_user){
        return this.dao.getRightsByIdUser(id_user)
    }

    async getRight(id_user, right){
        return this.dao.getRight(id_user, right)
    }

    async insert(usersrights){
        return this.dao.insert(usersrights)
    }

    async delete(id_user){
        return this.dao.delete(id_user)
    }
}