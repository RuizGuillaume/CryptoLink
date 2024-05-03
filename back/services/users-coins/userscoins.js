const UsersCoinsDAO = require("../../datamodel/users-coins/userscoinsdao")

module.exports = class UsersCoinsService {
    constructor(db) {
        this.dao = new UsersCoinsDAO(db)
    }

    isValid(userscoins){
        if(userscoins.buying_date !== null && userscoins.buying_date !== undefined) {} else { return false }
        if(userscoins.buying_price !== null && userscoins.buying_price !== undefined && userscoins.buying_price > 0 ) {} else { return false }
        if(userscoins.quantity !== null && userscoins.quantity !== undefined && userscoins.quantity > 0 ) {} else { return false }
        return true
    }

    async getAllUsersCoinsByIdUser(id_user){
        return this.dao.getAllUsersCoinsByIdUser(id_user)
    }

    async getUsersCoinsById(id_userscoins){
        return this.dao.getUsersCoinsById(id_userscoins)
    }

    async insert(userscoins){
        return this.dao.insert(userscoins)
    }

    async update(userscoins){
        return this.dao.update(userscoins)
    }

    async delete(id_userscoins){
        return this.dao.delete(id_userscoins)
    }
}