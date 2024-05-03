const Announcements = require("../class/announcements")

module.exports = (app, serviceAnnouncements, serviceUsersRights, jwt) => {

    app.get('/api/announcement', async (req, res) => {
        try{
            return res.json(await serviceAnnouncements.getAnnouncement())
        }catch(e){
            console.log(e)
        }
    })

    app.get('/api/announcement/admin', jwt.validateJWT, async (req, res) => {
        try{
            const admin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(admin === true){
                return res.json(await serviceAnnouncements.getAnnouncementAdmin())
            }
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.put('/api/announcement', jwt.validateJWT, async (req, res) => {
        try{
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
            serviceAnnouncements.update(new Announcements(req.body.start_date, req.body.end_date, req.body.message))
            return res.json({status: 200, message: "Message Enregistré"})
        }catch(e){
            console.log(e)
        }
    })
}