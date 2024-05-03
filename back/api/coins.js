const fs = require('fs')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const Coins = require('../class/coins')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "pictures/coins/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
})
const upload = multer({
    storage: storage, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png format allowed!'));
        }
    },}).single("coinfile")


module.exports = (app, serviceCoins, serviceUsersRights, jwt) => {

    app.get('/api/coins', async (req, res) => {
        try{
            return res.json(await serviceCoins.getAllCoins())
        }catch(e){
            console.log(e)
        }
    })

    app.get('/api/coin/:id_coin', async (req, res) => {
        try{
            return res.json(await serviceCoins.getCoinById(req.params.id_coin))
        }catch(e){
            console.log(e)
        }
    })

    app.get('/api/coins/homepage', async (req, res) => {
        try{
            return res.json(await serviceCoins.getCoinsHomepage())
        }catch(e){
            console.log(e)
        }
    })

    app.post('/api/coin', upload, jwt.validateJWT, async (req, res) => {
        const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
        if(right !== true){
            return res.json({status: 401, message: "Action non autorisée"})
        }
        try{
            const dest = ((req.file === undefined) ? "pictures/coins/defaultcoins.png" : req.file.destination + req.body.id_coins + "-" + req.file.filename)
            const coin = new Coins(req.body.id_coins, req.body.symbol, req.body.name, req.body.description, req.body.creation_date, "/" + dest, req.body.homepage)
            if(!serviceCoins.isValid(coin)){
                if(req.file !== undefined){
                    fs.unlinkSync(req.file.path)
                }
                res.json({status: 400, message: "Formulaire incorrect"})
                return
            }
            if(req.file !== undefined){
                await sharp(req.file.path)
                .resize(150, 150)
                .toFile(
                    dest
                )
                fs.unlinkSync(req.file.path)
            }
            await serviceCoins.insert(coin)
            res.json({status: 200, message: "Crypto ajoutée"})
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.put('/api/coin/:id_coins', upload, jwt.validateJWT, async (req, res) => {
        let coin = await serviceCoins.getCoinById(req.params.id_coins)
        const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
        if(right !== true){
            return res.json({status: 401, message: "Action non autorisée"})
        }
        try{
            const dest = ((req.file === undefined) ? coin.logo : req.file.destination + req.params.id_coins + "-" + req.file.filename)            
            if(req.file !== undefined){
                if(coin.logo !== '/pictures/coins/defaultcoins.png'){
                    fs.readFile(coin.logo.substr(1), function read(err, data) {
                        if(err){
                            console.log('Image introuvable')
                            return
                        }
                        fs.unlinkSync(coin.logo.substr(1))
                    })
                }
                await sharp(req.file.path)
                .resize(150, 150)
                .toFile(
                    dest
                )
                coin.logo = "/" + dest
                fs.unlinkSync(req.file.path)
            }
            if(req.body.symbol !== undefined && req.body.symbol !== null){
                coin.symbol = req.body.symbol
            }
            if(req.body.name !== undefined && req.body.name !== null){
                coin.name = req.body.name
            }
            if(req.body.description !== undefined && req.body.description !== null){
                coin.description = req.body.description
            }
            if(req.body.creation_date !== undefined && req.body.creation_date !== null){
                coin.creation_date = req.body.creation_date
            }
            if(req.body.homepage !== undefined && req.body.homepage !== null){
                coin.homepage = req.body.homepage
            }
            if(!serviceCoins.isValid(coin)){
                if(req.file !== undefined){
                    fs.unlinkSync(req.file.path)
                }
                res.json({status: 400, message: "Formulaire incorrect"})
                return
            }
            await serviceCoins.update(coin)
            res.json({status: 200, message: "Crypto modifiée"})
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.delete('/api/coin/:id_coins', jwt.validateJWT, async (req, res) => {
        let coin = await serviceCoins.getCoinById(req.params.id_coins)
        const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
        if(right !== true){
            return res.json({status: 401, message: "Action non autorisée"})
        }
        try{
            if(coin.logo !== '/pictures/coins/defaultcoins.png'){
                fs.readFile(coin.logo.substr(1), function read(err, data) {
                    if(err){
                        console.log('Image introuvable')
                        return
                    }
                    fs.unlinkSync(coin.logo.substr(1))
                })
            }
            await serviceCoins.delete(req.params.id_coins)
            res.json({status: 200, message: "Crypto supprimée"})
        }
        catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

}