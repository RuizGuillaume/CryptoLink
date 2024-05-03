const AnnouncementsDAO = require("../datamodel/announcementsdao")

module.exports = class AnnouncementsService {
    constructor(db) {
        this.dao = new AnnouncementsDAO(db)
    }

    getAnnouncement(){
        return this.dao.getAnnouncement()
    }

    getAnnouncementAdmin(){
        return this.dao.getAnnouncementAdmin()
    }

    insert(announcement){
        return this.dao.insert(announcement)
    }

    update(announcement){
        return this.dao.update(announcement)
    }
}