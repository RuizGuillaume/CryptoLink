const fs = require('fs')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "pictures/articles/")
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
    },}).single("thumbnailfile")
const Article = require("../../class/articles/articles")

module.exports = (app, serviceArticles, serviceUsersRights, jwt) => {

    app.get('/api/articles', async (req, res) => {
        try{
            return res.json(await serviceArticles.getAllArticles())
        }catch(e){
            console.log(e)
        }
    })

    app.get('/api/articles/admin', jwt.validateJWT, async (req, res) => {
        try{
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
            return res.json(await serviceArticles.getAllArticlesAdmin())
        }catch(e){
            console.log(e)
        }
    })

    app.get('/api/userarticles', jwt.validateJWT, async (req, res) => {
        try{
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_EDITOR')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
            return res.json(await serviceArticles.getAllArticlesByIdUser(req.user.id_user))
        }catch(e){
            console.log(e)
        }
    })

    
    app.get('/api/lastarticles', async (req, res) => {
        try{
            return res.json(await serviceArticles.getLastArticles())
        }catch(e){
            console.log(e)
        }
    })

    app.get('/api/articles/:search', async (req, res) => {
        try{
            return res.json(await serviceArticles.getArticlesBySearch(req.params.search))
        }catch(e){
            console.log(e)
        }
    })

    app.get('/api/articles/:search/admin', jwt.validateJWT, async (req, res) => {
        try{
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
            return res.json(await serviceArticles.getArticlesBySearchAdmin(req.params.search))
        }catch(e){
            console.log(e)
        }
    })


    app.get('/api/article/:id_article', async (req, res) => {
        try{
            return res.json(await serviceArticles.getArticleById(req.params.id_article))
        }catch(e){
            console.log(e)
        }
    })

    app.post('/api/article', upload, jwt.validateJWT, async (req, res) => {
        const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_EDITOR')
        if(right !== true){
            return res.json({status: 401, message: "Action non autorisée"})
        }
        try{
            const dest = ((req.file === undefined) ? "pictures/articles/defaultarticle.jpg" : req.file.destination + "article-" + req.file.filename)
            const article = new Article(req.body.title, req.body.publish_date, req.body.content, "/" + dest, true, req.user.id_user)
            if(!serviceArticles.isValid(article)){
                if(req.file !== undefined){
                    fs.unlinkSync(req.file.path)
                }
                res.json({status: 400, message: "Formulaire incorrect"})
                return
            }
            if(req.file !== undefined){
                await sharp(req.file.path)
                .resize(1920, 1080)
                .jpeg({ quality: 100 })
                .toFile(
                    dest
                )
                fs.unlinkSync(req.file.path)
            }
            await serviceArticles.insert(article)
            res.json({status: 200, message: "Article ajouté"})
        }catch(e){
            if(req.file !== undefined){
                fs.unlinkSync(req.file.path)
            }
            console.log(e)
            res.status(500).end()
        }
    })

    app.put('/api/article/:id_article', upload, jwt.validateJWT, async (req, res) => {
        let article = await serviceArticles.getArticleById(req.params.id_article)
        if(article.id_user !== req.user.id_user) {
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
        }
        try{
            const dest = ((req.file === undefined) ? article.thumbnail : req.file.destination + "article-" + req.file.filename)            
            if(req.file !== undefined){
                if(article.thumbnail !== '/pictures/articles/defaultarticle.jpg'){
                    fs.readFile(article.thumbnail.substr(1), function read(err, data) {
                        if(err){
                            console.log('Image introuvable')
                            return
                        }
                        fs.unlinkSync(article.thumbnail.substr(1))
                    }) 
                }
                await sharp(req.file.path)
                .resize(1920, 1080)
                .jpeg({ quality: 100 })
                .toFile(
                    dest
                )
                article.thumbnail = "/" + dest
                fs.unlinkSync(req.file.path)
            }
            if(req.body.title !== undefined && req.body.title !== null){
                article.title = req.body.title
            }
            if(req.body.content !== undefined && req.body.content !== null){
                article.content = req.body.content
            }
            if(req.body.visible !== undefined && req.body.visible !== null){
                article.visible = req.body.visible
            }
			if(req.body.publish_date !== undefined && req.body.publish_date !== null){
                article.publish_date = req.body.publish_date
            }
            if(!serviceArticles.isValid(article)){
                if(req.file !== undefined){
                    fs.unlinkSync(req.file.path)
                }
                res.json({status: 400, message: "Formulaire incorrect"})
                return
            }
            await serviceArticles.update(article)
            res.json({status: 200, message: "Article modifié"})
        }catch(e){
            if(req.file !== undefined){
                fs.unlinkSync(req.file.path)
            }
            console.log(e)
            res.status(500).end()
        }
    })

    app.delete('/api/article/:id_article', jwt.validateJWT, async (req, res) => {
        let article = await serviceArticles.getArticleById(req.params.id_article)
        if(article.id_user !== req.user.id_user) {
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
        }
        try{
            if(article.thumbnail !== '/pictures/articles/defaultarticle.jpg'){
                fs.readFile(article.thumbnail.substr(1), function read(err, data) {
                    if(err){
                        console.log('Image introuvable')
                        return
                    }
                    fs.unlinkSync(article.thumbnail.substr(1))
                })   
            }
            await serviceArticles.delete(req.params.id_article)
            res.json({status: 200, message: "Article supprimé"})
        }
        catch(e){
            console.log(e)
            res.status(500).end()
        }
    })
}