const jwtreq = require('jsonwebtoken')
module.exports = (app, serviceRights, serviceUsersRights, jwt) => {

    app.get('/api/rights', jwt.validateJWT, async (req, res) => {
        try{
            const admin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(admin === true){
                return res.json(await serviceRights.getAllRights())
            }
            else{
                res.json({status: 401, message: "L'utilisateur n'a pas les droits d'accès nécessaires"}).end()
            }     
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })
    
}