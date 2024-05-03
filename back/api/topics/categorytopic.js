const jwtreq = require('jsonwebtoken')
module.exports = (app, serviceCategorytopic, jwt) => {

    app.get('/api/categorytopic', async (req, res) => {
        try{
            return res.json(await serviceCategorytopic.getAllCategories())
        }catch(e){
            console.log(e)
        }
    })
}