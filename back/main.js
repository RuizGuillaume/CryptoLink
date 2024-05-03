require('dotenv').config()
const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const CoinsService = require("./services/coins")
const UsersService = require("./services/users-rights/users")
const UsersRightsService = require("./services/users-rights/usersrights")
const RightsService = require("./services/users-rights/rights")
const ArticlesService = require("./services/articles/articles")
const CommentsService = require("./services/articles/comments")
const AnnouncementsService = require("./services/announcements")
const CategoryTopicService = require("./services/topics/categorytopic")
const TopicsService = require("./services/topics/topics")
const PostsService = require("./services/topics/posts")
const UsersCoinsService = require("./services/users-coins/userscoins")
const WebsitesService = require("./services/websites")

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

app.use('/pictures', express.static('pictures'));

app.use(express.static('./build'))

pg.types.setTypeParser(1082, function(stringValue) {
  return stringValue;  //1082 for date type
});

//Chaine de connexion
const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const db = new pg.Pool({ connectionString: connectionString })

const coinsService = new CoinsService(db)
const usersService = new UsersService(db)
const usersrightsService = new UsersRightsService(db)
const rightsService = new RightsService(db)
const articlesService = new ArticlesService(db)
const commentsService = new CommentsService(db)
const announcementsService = new AnnouncementsService(db)
const categorytopicService = new CategoryTopicService(db)
const topicsService = new TopicsService(db)
const postsService = new PostsService(db)
const userscoinsService = new UsersCoinsService(db)
const websitesService = new WebsitesService(db)

const jwt = require('./jwt')(usersService)
const mailer = require('./mailer')

require("./api/coins")(app, coinsService, usersrightsService, jwt)
require("./api/users-rights/users")(app, usersService, usersrightsService, jwt, mailer)
require("./api/users-rights/usersrights")(app, usersrightsService, jwt)
require("./api/users-rights/rights")(app, rightsService, usersrightsService,jwt)
require("./api/articles/articles")(app, articlesService, usersrightsService, jwt)
require("./api/articles/comments")(app, commentsService, usersrightsService, jwt)
require("./api/announcements")(app, announcementsService, usersrightsService, jwt)
require("./api/topics/categorytopic")(app, categorytopicService, jwt)
require("./api/topics/topics")(app, topicsService, usersrightsService, jwt)
require("./api/topics/posts")(app, postsService, usersrightsService, jwt)
require("./api/users-coins/userscoins")(app, userscoinsService, usersrightsService, jwt)
require("./api/websites")(app, websitesService, usersService, usersrightsService, jwt, mailer)

app.get('/*',(_ , res ) => {
	res.sendFile( __dirname + '/build/index.html')
})

require('./datamodel/seeder')(coinsService,
                              usersService,
                              usersrightsService,
                              rightsService,
                              articlesService,
                              commentsService,
                              announcementsService,
                              categorytopicService,
                              topicsService,
                              postsService,
                              userscoinsService,
                              websitesService
                             )
   .then(app.listen(process.env.APP_PORT))
   
console.log(`app listen on port ${process.env.APP_PORT}`)

