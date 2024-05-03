const jwt = require('jsonwebtoken')
const jwtKey = 'CryptoLink'
const jwtExpirySeconds = 86400

module.exports = (usersService) => {
    return {
        validateJWT(req, res, next) {
            if (req.headers.authorization === undefined) {
                res.status(401).end()
                return
            }
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, jwtKey, {algorithm: "HS256"},  async (err, user) => {
                if (err) {
                    console.log(err)
                    res.status(401).json({message: "Token expiré..."})
                    return
                }
                try {
                    req.user = await usersService.getUserByEmail(user.login.email)
                    return next()
                } catch(e) {
                    console.log(e)
                    res.status(401).end()
                }

            })
        },
        generateJWT(login) {
            return jwt.sign({login}, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            })
        },
        getKey() {
            return jwtKey
        },
		checkIsConnected(req, res, next) {
            if (req.headers.authorization === undefined) {
				req.user = undefined
                 return next() 
            }
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, jwtKey, {algorithm: "HS256"},  async (err, user) => {
                if (err) {
                    console.log(err)
					req.user = undefined
                     return next() 
                }
                try {
                    req.user = await usersService.getUserByEmail(user.login.email)
                    return next()
                } catch(e) {
                    console.log(e)
                    return 
                }

            })
        }
    }
}