const jwtreq = require('jsonwebtoken')
const Topic = require('../../class/topics/topics')
module.exports = (app, serviceTopic, serviceUsersRights, jwt) => {

    app.get('/api/topics', jwt.checkIsConnected, async (req, res) => {
        try{ 
		let id_user = req.user === undefined  || req.user.id_user === undefined ? 0 : req.user.id_user * 1 
            return res.json(await serviceTopic.getAllTopics(id_user))
        }catch(e){
            console.log(e)
        }
    })

    app.get('/api/topics/admin', jwt.validateJWT, async (req, res) => {
        try{ 
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
            return res.json(await serviceTopic.getAllTopicsAdmin())
        }catch(e){
            console.log(e)
        }
    })

    app.get('/api/topics/:id_categorytopic', jwt.checkIsConnected, async (req, res) => {
        try{
			let id_user = req.user === undefined  || req.user.id_user === undefined ? 0 : req.user.id_user * 1 
            return res.json(await serviceTopic.getAllTopicsByCategory(req.params.id_categorytopic , id_user))
        }catch(e){
            console.log(e)
        }
    })

    app.get('/api/topic/:id_topic', jwt.checkIsConnected, async (req, res) => {
        try{
			let id_user = req.user === undefined  || req.user.id_user === undefined ? 0 : req.user.id_user * 1 
            return res.json(await serviceTopic.getTopicById(req.params.id_topic , id_user))
        }catch(e){
            console.log(e)
        }
    })

    app.get('/api/topics/search/:search', async (req, res) => {
        try{
			let id_user = req.user === undefined  || req.user.id_user === undefined ? 0 : req.user.id_user * 1 
            return res.json(await serviceTopic.getTopicsBySearch(req.params.search , id_user))
        }catch(e){
            console.log(e)
        }
    }) 

    app.get('/api/topics/search/:search/admin', jwt.validateJWT, async (req, res) => {
        try{ 
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
            return res.json(await serviceTopic.getTopicsBySearchAdmin(req.params.search))
        }catch(e){
            console.log(e)
        }
    })

    app.post('/api/topic', jwt.validateJWT, async (req, res) => {
        try{
            const right = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_USER')
            if(right !== true){
                return res.json({status: 401, message: "Action non autorisée"})
            }
            const topic = new Topic(req.body.title, req.body.publish_date, req.body.content, false, req.body.category, req.user.id_user)
            if(!serviceTopic.isValid(topic)){
                res.json({status: 400, message: "Formulaire incorrect"})
                return
            }
            await serviceTopic.insert(topic)
            res.json({status: 200, message: "Topic ajouté"})
        }catch(e){
            console.log(e)
        }
    })

    app.put('/api/topic/:id_topic', jwt.validateJWT, async (req, res) => {
        const topic = await serviceTopic.getTopicById(req.params.id_topic)
        try{
            if(topic.id_user !== req.user.id_user){
                const rightmod = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_MODERATOR')
                if(rightmod !== true){
                    const rightadmin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
                    if(rightadmin !== true){
                        return res.json({status: 401, message: "Action non autorisée"})
                    }
                }
            }
            if(req.body.title !== undefined && req.body.title !== null) {
                topic.title = req.body.title
            }

            if(req.body.content !== undefined && req.body.content !== null) {
                topic.content = req.body.content
            }
            if(req.body.closed !== undefined && req.body.closed !== null) {
                topic.closed = req.body.closed
            }
            if(req.body.category !== undefined && req.body.category !== null) {
                topic.category = req.body.category
            }
			if(req.body.publish_date !== undefined && req.body.publish_date !== null) {
                topic.publish_date = req.body.publish_date
            }
            if(!serviceTopic.isValid(topic)){
                res.json({status: 400, message: "Formulaire incorrect"})
                return
            }
            await serviceTopic.update(topic)
            res.json({status: 200, message: "Topic modifié"})
        }catch(e){
            console.log(e)
        }
    })

    app.delete('/api/topic/:id_topic', jwt.validateJWT, async (req, res) => {
        const topic = await serviceTopic.getTopicById(req.params.id_topic)
        try{
            if(topic.id_user !== req.user.id_user){
                const rightmod = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_MODERATOR')
                if(rightmod !== true){
                    const rightadmin = await serviceUsersRights.getRight(req.user.id_user, 'ROLE_ADMIN')
                    if(rightadmin !== true){
                        return res.json({status: 401, message: "Action non autorisée"})
                    }
                }
            }
            await serviceTopic.delete(req.params.id_topic)
            res.json({status: 200, message: "Topic supprimé"})
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })
}