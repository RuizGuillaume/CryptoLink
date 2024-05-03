const jwtreq = require('jsonwebtoken')
const UsersRights = require('../../class/users-rights/usersrights')
module.exports = (app, serviceUsersRights, jwt) => {

    app.get('/api/userright/:id_user', jwt.validateJWT, async (req, res) => {
        try{
            const admin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(admin === true){
                return res.json(await serviceUsersRights.getRightsByIdUser(req.params.id_user))
            }
            else{
                return res.json({status: 401, message: "L'utilisateur n'a pas les droits d'accès nécessaires"}).end()
            }     
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.put('/api/userright/:id_user', jwt.validateJWT, async (req, res) => {
        try{
            const admin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(admin === true){
                if(req.body.rights.length !== 0 && req.body.rights !== undefined && req.body.rights !== null){
                    await serviceUsersRights.delete(req.params.id_user)
                    req.body.rights.map(async (right) => {
                        await serviceUsersRights.insert(new UsersRights(req.params.id_user, right.id_right))
                    })
                    return res.status(200).end()
                }
                return res.status(200).end()
            }
            else{
                return res.json({status: 401, message: "L'utilisateur n'a pas les droits d'accès nécessaires"}).end()
            }
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })
}