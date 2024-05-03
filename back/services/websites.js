const WebsitesDAO = require("../datamodel/websitesdao")

module.exports = class WebsitesService {
    constructor(db) {
        this.dao = new WebsitesDAO(db)
    }

    getAllWebsites(){
        return this.dao.getAllWebsites()
    }

    getWebisteById(id_website){
        return this.dao.getWebisteById(id_website)
    }

    getWebsiteBySearch(search){
        return this.dao.getWebsiteBySearch(search)
    }

    insert(website){
        return this.dao.insert(website)
    }

    update(website){
        return this.dao.update(website)
    }

    delete(id_website){
        return this.dao.delete(id_website)
    }
}