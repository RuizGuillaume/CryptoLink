const UsersCoins = require("../../class/users-coins/userscoins")

module.exports = (app, serviceUsersCoins, serviceUsersRights, jwt) => {

    app.get('/api/userscoins', jwt.validateJWT, async (req, res) => {
        try{
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_USER')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"}).end()
            }
            return res.json(await serviceUsersCoins.getAllUsersCoinsByIdUser(req.user.id_user))
        }catch(e){
            console.log(e)
        }
    })

    app.post('/api/userscoins', jwt.validateJWT, async (req, res) => {
        try{
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_USER')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
            const userscoins = new UsersCoins(req.body.buying_date, req.body.buying_price, req.body.quantity, req.body.id_coins, req.user.id_user)
            if(!serviceUsersCoins.isValid(userscoins)){
                res.json({status: 400, message: "Formulaire incorrect"})
                return
            }
            await serviceUsersCoins.insert(userscoins)
            res.json({status: 200, message: "Crypto ajoutée"})
        }catch(e){
            console.log(e)
        }
    })

    app.put('/api/userscoins/:id_userscoins', jwt.validateJWT, async (req, res) => {
        const userscoins = await serviceUsersCoins.getUsersCoinsById(req.params.id_userscoins)
        try{
            if(userscoins.id_user !== req.user.id_user){
                const rightadmin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
                if(rightadmin !== true){
                    return res.json({status: 401, message: "Action non autorisée"})
                }
            }
            if(req.body.buying_date !== undefined && req.body.buying_date !== null) {
                userscoins.buying_date = req.body.buying_date
            }
            if(req.body.buying_price !== undefined && req.body.buying_price !== null) {
                userscoins.buying_price = req.body.buying_price
            }
            if(req.body.quantity !== undefined && req.body.quantity !== null) {
                userscoins.quantity = req.body.quantity
            }
            if(req.body.id_coins !== undefined && req.body.id_coins !== null) {
                userscoins.id_coins = req.body.id_coins
            }
            if(!serviceUsersCoins.isValid(userscoins)){
                res.json({status: 400, message: "Formulaire incorrect"})
                return
            }
            await serviceUsersCoins.update(userscoins)
            res.json({status: 200, message: "Crypto modifiée"})
        }catch(e){
            console.log(e)
        }
    })

    app.delete('/api/userscoins/:id_userscoins', jwt.validateJWT, async (req, res) => {
        const userscoins = await serviceUsersCoins.getUsersCoinsById(req.params.id_userscoins)
        try{
            if(userscoins.id_user !== req.user.id_user){
                const rightadmin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
                if(rightadmin !== true){
                    return res.json({status: 401, message: "Action non autorisée"})
                }
            }
            await serviceUsersCoins.delete(req.params.id_userscoins)
            res.json({status: 200, message: "Crypto supprimée"})
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })
}