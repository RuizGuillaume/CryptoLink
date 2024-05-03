const { reject } = require('bcrypt/promises')
const BaseDAO = require('./basedao')

module.exports = class AnnouncementsDAO extends BaseDAO {

    constructor(db) {
        super(db, "announcements")
    }

    getAnnouncement() {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM public.announcements
                           WHERE Now() BETWEEN start_date AND end_date`)
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }
    getAnnouncementAdmin() {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM public.announcements`)
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    insert(announcement) {
        return this.db.query("INSERT INTO public.announcements(start_date, end_date, message) VALUES ($1,$2,$3)",
        [announcement.start_date, announcement.end_date, announcement.message])
    }

    update(announcement) {
        return new Promise((resolve, reject) =>
        this.db.query("UPDATE public.announcements SET start_date = $1, end_date = $2, message = $3",
        [announcement.start_date, announcement.end_date, announcement.message])
            .then(res => {resolve(res)})
            .catch(e => {reject(e)}))
    }
}