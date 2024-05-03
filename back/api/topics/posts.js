const Posts = require('../../class/topics/posts')
module.exports = (app, servicePosts, serviceUsersRights, jwt) => {

    app.get('/api/posts/:id_topic', async (req, res) => {
        try{
            return res.json(await servicePosts.getPostsByIdTopic(req.params.id_topic))
        }catch(e){
            console.log(e)
        }
    })

    app.get('/api/posts/:id_topic/moderate', jwt.validateJWT, async (req, res) => {
        try{
            const rightmod = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_MODERATOR')
            if(rightmod !== true){
                const rightadmin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
                if(rightadmin !== true){
                    return res.json({status: 401, message: "Action non autorisée"})
                }
            }
            return res.json(await servicePosts.getPostsByIdTopicModerate(req.params.id_topic))
        }catch(e){
            console.log(e)
        }
    })

    app.get('/api/post/:id_post', async (req, res) => {
        try{
            return res.json(await servicePosts.getPostById(req.params.id_post))
        }catch(e){
            console.log(e)
        }
    })

    app.post('/api/post/:id_topic', jwt.validateJWT, async (req, res) => {
        try{
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_USER')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
            const post = new Posts(req.body.writing_date, req.body.post, true, req.params.id_topic, req.user.id_user)
            if(!servicePosts.isValid(post)){
                return res.json({status: 400, message: "Formulaire incorrect"})
            }
            await servicePosts.insert(post)
            res.json({status: 200, message: "post ajouté"})
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
        
    })

    app.put('/api/post/:id_post', jwt.validateJWT, async (req, res) => {
        const post = await servicePosts.getPostById(req.params.id_post)
        try{
            if(post.id_user !== req.user.id_user) {
                const rightmod = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_MODERATOR')
                if(rightmod !== true){
                    const rightadmin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
                    if(rightadmin !== true){
                        return res.json({status: 401, message: "Action non autorisée"})
                    }
                }
            }
            if(req.body.post !== undefined && req.body.post !== null){
                post.post = req.body.post
            }
            if(req.body.visible !== undefined && req.body.visible !== null){
                post.visible = req.body.visible
            }
            if(!servicePosts.isValid(post)){
                return res.json({status: 400, message: "Formulaire incorrect"})
            }
            await servicePosts.update(post)
            res.json({status: 200, message: "post modifié"})
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.delete('/api/post/:id_post', jwt.validateJWT, async (req, res) => {
        try{
            const post = await servicePosts.getPostById(req.params.id_post)
            if(post.id_user !== req.user.id_user) {
                const rightmod = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_MODERATOR')
                if(rightmod !== true){
                    const rightadmin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
                    if(rightadmin !== true){
                        return res.json({status: 401, message: "Action non autorisée"})
                    }
                }
            }
            await servicePosts.delete(req.params.id_post)
            res.json({status: 200, message: "post supprimé"})
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })
}