const fs = require('fs')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "pictures/avatars/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
})
const upload = multer({
    storage: storage, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },}).single("avatarfile")
const Users = require('../../class/users-rights/users')
const UsersRights = require('../../class/users-rights/usersrights')
module.exports = (app, serviceUsers, serviceUsersRights, jwt, mailer) => {

    app.post('/api/user/authenticate', async (req, res) => {
        const email = req.body.email
        const password = req.body.password
        if ((email === undefined) || (password === undefined)) {
            res.json({status: 400, message: "Formulaire incorrect"})
            return
        }
        const usertmp = await serviceUsers.getUserByEmail(email)
        if(usertmp === undefined || usertmp === null){
            res.json({status: 401, message: "Accès non autorisé"})
            return res.status(401)
        }
        const rights = await serviceUsersRights.getRightsByIdUser(usertmp.id_user)
        let righttab = []
        rights.forEach(right => {
            righttab.push({label : right.label})
        });
        try{
            serviceUsers.validatePassword(usertmp, password)
            .then(async authenticated => {
                if (!authenticated) {
                    res.json({status: 401, message: "Accès non autorisé"})
                    return res.status(401)
                }
                const user = {email: usertmp.email, pseudo: usertmp.pseudo, rights: righttab }
                res.json({'token': jwt.generateJWT(user)})
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
        } 
        catch(e){
            console.log(e)
        }
        
    })

    app.get('/api/users', jwt.validateJWT, async (req, res) => {
        try{
            const admin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(admin === true){
                return res.json(await serviceUsers.getAllUsers())
            }
            else{
                res.json({status: 401, message: "L'utilisateur n'a pas les droits d'accès nécessaires"})
            }   
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.get('/api/user', jwt.validateJWT, async (req, res) => {
        try{
            if(req.user.id_user !== undefined && req.user.id_user !== null){
                return res.json(await serviceUsers.getUserById(req.user.id_user))
            }
            else{
                res.status(400).end()
            }   
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.get('/api/user/:id_user', jwt.validateJWT, async (req, res) => {
        try{
            const admin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(admin === true){
                return res.json(await serviceUsers.getUserById(req.params.id_user))
            }
            else{
                res.json({status: 401, message: "L'utilisateur n'a pas les droits d'accès nécessaires"})
            }   
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.post('/api/user', upload, async (req, res) => {
        try{
            const dest = ((req.file === undefined) ? "pictures/avatars/defaultavatar.jpg" : req.file.destination + "avatar-" + req.file.filename)
            const user = new Users(req.body.email, req.body.password, req.body.pseudo, "/" + dest, false)
            if(!serviceUsers.isValid(user)){
                fs.unlinkSync(req.file.path)
                res.json({status: 400, message: "Formulaire incorrect"})
                return
            }
            const id_user = await serviceUsers.insert(user)
            if(id_user !== null && id_user !== undefined){
                if(req.file !== undefined){
                    await sharp(req.file.path)
                    .resize(150, 150)
                    .jpeg({ quality: 100 })
                    .toFile(
                        dest
                    )
                    fs.unlinkSync(req.file.path)
                }
                await serviceUsersRights.insert(new UsersRights(id_user,1))
                res.json({status: 200, message: "Utilisateur ajouté"})
            }
            else{
                if(req.file !== undefined){
                    fs.unlinkSync(req.file.path)
                }
                res.json({status: 404, message: "Erreur lors de l'ajout de l'utilisateur"})
            }
        }catch(e){
            if(req.file !== undefined){
                fs.unlinkSync(req.file.path)
            }
            console.log(e)
            res.status(500).end()
        }
    })

    app.put('/api/user', upload, jwt.validateJWT, async (req, res) => {
        let dest = ((req.file === undefined) ? req.user.avatar : req.file.destination + "avatar-" + req.file.filename)
        try{
            if(req.file === undefined || req.file === null) {
                req.body.avatar = req.user.avatar
            }else {
                if(req.user.avatar !== '/pictures/avatars/defaultavatar.jpg'){
                    fs.readFile(req.user.avatar.substr(1), function read(err, data) {
                        if(err){
                            console.log('Image introuvable')
                            return
                        }
                        fs.unlinkSync(req.user.avatar.substr(1))
                    })
                }
                await sharp(req.file.path)
                    .resize(150, 150)
                    .jpeg({ quality: 100 })
                    .toFile(
                        dest
                )
                dest = "/" + dest
                fs.unlinkSync(req.file.path)
            }
            if(req.body.email === undefined || req.body.email === null) {
                req.body.email = req.user.email
            }
            if(req.body.password === undefined || req.body.password === null) {
                req.body.password = req.user.password
            } else {
                req.body.password = serviceUsers.hashPassword(req.body.password)
            }
            if(req.body.pseudo === undefined || req.body.pseudo === null) {
                req.body.pseudo = req.user.pseudo
            }
            const user = new Users(req.body.email, req.body.password, req.body.pseudo, dest, req.user.disable)
            await serviceUsers.update(user, req.user.id_user)
            res.json({status: 200, message: "Utilisateur modifié"})
        }catch(e){
            if(req.file !== undefined){
                fs.unlinkSync(req.file.path)
            }
            console.log(e)
            res.status(500).end()
        }
    })

    app.put('/api/admin/user/:id_user', upload, jwt.validateJWT, async (req, res) => {
        const usermodif = await serviceUsers.getUserById(req.params.id_user)
        let dest = ((req.file === undefined) ? usermodif.avatar : req.file.destination + "avatar-" + req.file.filename)
        try{
            if(req.file === undefined || req.file === null) {
                req.body.avatar = usermodif.avatar
            }else {
                if(usermodif.avatar !== '/pictures/avatars/defaultavatar.jpg'){
                    fs.readFile(usermodif.avatar.substr(1), function read(err, data) {
                        if(err){
                            console.log('Image introuvable')
                            return
                        }
                        fs.unlinkSync(usermodif.avatar.substr(1))
                    })
                }
                await sharp(req.file.path)
                    .resize(150, 150)
                    .jpeg({ quality: 100 })
                    .toFile(
                        dest
                )
                dest = "/" + dest
                fs.unlinkSync(req.file.path)
            }
            if(req.body.email === undefined || req.body.email === null) {
                req.body.email = usermodif.email
            }
            if(req.body.password === undefined || req.body.password === null) {
                req.body.password = usermodif.password
            } else {
                req.body.password = serviceUsers.hashPassword(req.body.password)
            }
            if(req.body.pseudo === undefined || req.body.pseudo === null) {
                req.body.pseudo = usermodif.pseudo
            }
            if(req.body.disable === undefined || req.body.disable === null) {
                req.body.disable = usermodif.disable
            }
            const user = new Users(req.body.email, req.body.password, req.body.pseudo, dest, req.body.disable)
            await serviceUsers.update(user, req.params.id_user)
            res.json({status: 200, message: "Utilisateur modifié"})
        }catch(e){
            if(req.file !== undefined){
                fs.unlinkSync(req.file.path)
            }
            console.log(e)
            res.status(500).end()
        }
    })

    app.post('/api/forgot_password', async (req, res) => {
        if(req.body.email !== undefined && req.body.email !== null && req.body.email.trim().length > 0){

            if(await serviceUsers.getUserByEmail(req.body.email) === undefined) {
                //res.json({status: 404, message: "L'adresse email renseignée n'est pas rattachée a un compte utilisateur ou celui-ci est bloqué"})
                res.statusMessage ="L'adresse email renseignée n'est pas rattachée a un compte utilisateur ou celui-ci est bloqué"
                res.status(404).end()
            }
            else{
                const resettoken = jwt.generateJWT({email: req.body.email})
                const url = process.env.APP_URL + `/changement-du-mot-de-passe/${resettoken}`
                
                //Préparation et envoi du mail

                const subject = "Réinitialisation du mot de passe CryptoLink"
                const text = `Bonjour,\n\nCliquez sur le lien suivant pour réinitialiser votre mot de passe : ${url}\n\nCordialement.\n\nL'équipe CryptoLink\n\n***** Ce mail est généré automatiquement. Merci de ne pas y repondre *****`
                mailer(req.body.email,subject,text)
                res.json({status: 200, message: "Email envoyé"})
            }
        }
        else{
            res.status(404)
        }
    })

    app.post('/api/reset_password', jwt.validateJWT, async (req, res) => {
        if(req.user === undefined) {
            res.json({status: 404, message: "L'utilisateur n'existe pas"})
            return
        }

        if(req.body.password !== undefined && req.body.password !== null && req.body.password.trim().length > 0){
            const user = new Users(req.user.email, serviceUsers.hashPassword(req.body.password), req.user.pseudo, req.user.avatar)
            serviceUsers.update(user, req.user.id_user).then(res.json({status: 200, message: "Mot de passe modifié"})).catch(e => { console.log(e); res.status(404).end() })
        }
        else {
            res.json({status: 404, message: "Erreur de saisie du mot de passe"})
        }
    })

}