const Websites = require("../class/websites")
const multer = require('multer')
const upload = multer({ 
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },}).array("websitefiles", 99)
module.exports = (app, serviceWebsites, serviceUsers, serviceUsersRights, jwt, mailer) => {

    app.get('/api/websites', async (req, res) => {
        try{
            return res.json(await serviceWebsites.getAllWebsites())
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.get('/api/websites/:search', async (req, res) => {
        try{
            return res.json(await serviceWebsites.getWebsiteBySearch(req.params.search))
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.post('/api/website', upload, jwt.validateJWT, async (req, res) => {
        try{
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_USER')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
            const users = await serviceUsers.getAllUsersAdmin()
            let mailusers = ""
            users.forEach(user => {
                mailusers += user.email + ','
            });
            let attachmentsfiles = []
            req.files.forEach(file => {
                attachmentsfiles.push({
                    filename: file.originalname,
                    content: file.buffer
                })
            });

            //Préparation et envoi du mail

            const subject = "URL : " + req.body.url
            const text = req.body.text + `\n\nRendez-vous sur http://cryptolink.enzo-rossi.fr/admin/sites pour ajouter ce site a la liste.\n\nL'équipe CryptoLink\n\n***** Ce mail est généré automatiquement. Merci de ne pas y repondre *****`
            const attachments = attachmentsfiles
            mailer(mailusers, subject, text, attachments)
            res.json({status: 200, message: "Email envoyé"})
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.post('/api/website/admin', jwt.validateJWT, async (req, res) => {
        try{
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
            if(req.body.url === undefined || req.body.url === null){
                return res.status(400).end()
            }
            const website = new Websites(req.body.url, req.body.fraudulent, req.user.id_user)
            await serviceWebsites.insert(website)
            return res.json({status: 200, message: "Ajout effectué avec succés"})
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.put('/api/website/:id_website', jwt.validateJWT, async (req, res) => {
        try{
            let website = await serviceWebsites.getWebisteById(req.params.id_website)
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
            if(req.body.url !== undefined && req.body.url !== null){
                website.url = req.body.url
            }
            if(req.body.fraudulent !== undefined && req.body.fraudulent !== null){
                website.fraudulent = req.body.fraudulent
            }
            if(website.url === undefined || website.url === null){
                return res.status(400).end()
            }
            await serviceWebsites.update(website)
            return res.json({status: 200, message: "Modification effectué avec succés"})

        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.delete('/api/website/:id_website', jwt.validateJWT, async (req, res) => {
        try{
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
            await serviceWebsites.delete(req.params.id_website)
            return res.json({status: 200, message: "Suppression effectué avec succés"})

        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })
}