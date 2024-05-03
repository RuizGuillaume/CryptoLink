const bcrypt = require('bcrypt')
const UsersDAO = require("../../datamodel/users-rights/usersdao")

module.exports = class UsersService {
    constructor(db) {
        this.dao = new UsersDAO(db)
    }

    isValid(user){
        if(user.email !== null && user.email !== undefined && user.email.trim().length !== 0) {} else { return false }
        if(user.password !== null && user.password !== undefined && user.password.trim().length !== 0 ) {} else { return false }
        if(user.pseudo !== null && user.pseudo !== undefined && user.pseudo.trim().length !== 0 ) {} else { return false }
        return true
    }

    getAllUsers(){
        return this.dao.getAllUsers()
    }

    getAllUsersAdmin(){
        return this.dao.getAllUsersAdmin()
    }

    getUserById(id_users){
        return this.dao.getUserById(id_users)
    }

    getUserByEmail(email){
        return this.dao.getUserByEmail(email)
    }

    insert(user){
        user.password = this.hashPassword(user.password)
        return this.dao.insert(user)
    }

    update(user, id_user){
        return this.dao.update(user, id_user)
    }
    
    async validatePassword(user, password) {
        return this.comparePassword(password, user.password)
    }

    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }

    hashPassword(password) {
        return bcrypt.hashSync(password, 5)
    }

}