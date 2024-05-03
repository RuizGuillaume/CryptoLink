const Comment = require('../../class/articles/comments')
module.exports = (app, serviceComments, serviceUsersRights, jwt) => {

    app.get('/api/comments/:id_article', async (req, res) => {
        try{
            return res.json(await serviceComments.getCommentsByIdArticle(req.params.id_article))
        }catch(e){
            console.log(e)
        }
    })

    app.get('/api/comments/:id_article/moderate', jwt.validateJWT, async (req, res) => {
        try{
            const rightmod = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_MODERATOR')
            if(rightmod !== true){
                const rightadmin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
                if(rightadmin !== true){
                    return res.json({status: 401, message: "Action non autorisée"})
                }
            }
            return res.json(await serviceComments.getCommentsByIdArticleModerate(req.params.id_article))
        }catch(e){
            console.log(e)
        }
    })


    app.get('/api/comment/:id_comment', async (req, res) => {
        try{
            return res.json(await serviceComments.getCommentById(req.params.id_comment))
        }catch(e){
            console.log(e)
        }
    })

    app.post('/api/comment/:id_article', jwt.validateJWT, async (req, res) => {
        try{
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_USER')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
            const comment = new Comment(req.body.writing_date, req.body.comment, true, req.params.id_article, req.user.id_user)
            if(!serviceComments.isValid(comment)){
                return res.json({status: 400, message: "Formulaire incorrect"})
            }
            await serviceComments.insert(comment)
            res.json({status: 200, message: "Commentaire ajouté"})
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
        
    })

    app.put('/api/comment/:id_comment', jwt.validateJWT, async (req, res) => {
        const comment = await serviceComments.getCommentById(req.params.id_comment)
        try{
            if(comment.id_user !== req.user.id_user) {
                const rightmod = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_MODERATOR')
                if(rightmod !== true){
                    const rightadmin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
                    if(rightadmin !== true){
                        return res.json({status: 401, message: "Action non autorisée"})
                    }
                }
            }
            if(req.body.comment !== undefined && req.body.comment !== null){
                comment.comment = req.body.comment
            }
            if(req.body.visible !== undefined && req.body.visible !== null){
                comment.visible = req.body.visible
            }
            if(!serviceComments.isValid(comment)){
                return res.json({status: 400, message: "Formulaire incorrect"})
            }
            await serviceComments.update(comment)
            res.json({status: 200, message: "Commentaire modifié"})
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.delete('/api/comment/:id_comment', jwt.validateJWT, async (req, res) => {
        try{
            const comment = await serviceComments.getCommentById(req.params.id_comment)
            if(comment.id_user !== req.user.id_user) {
                const rightmod = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_MODERATOR')
                if(rightmod !== true){
                    const rightadmin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
                    if(rightadmin !== true){
                        return res.json({status: 401, message: "Action non autorisée"})
                    }
                }
            }
            await serviceComments.delete(req.params.id_comment)
            res.json({status: 200, message: "Commentaire supprimé"})
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })
}