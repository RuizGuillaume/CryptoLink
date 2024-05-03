module.exports = class Users {
    constructor(email, password, pseudo, avatar, disable) {
        this.email = email
        this.password = password
        this.pseudo = pseudo
        this.avatar = avatar
        this.disable = disable
    }
}