const Coins = require("../class/coins")
const Users = require("../class/users-rights/users")
const Rights = require("../class/users-rights/rights")
const UsersRights = require("../class/users-rights/usersrights")
const Announcements = require("../class/announcements")
const CategoryTopic = require("../class/topics/categorytopic")
const Topics = require("../class/topics/topics")
const Posts = require("../class/topics/posts")
const UsersCoins = require("../class/users-coins/userscoins")
const Websites = require("../class/websites")

module.exports = (coinsService,
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
                 ) => {
return new Promise(async (resolve, reject) => {

        // creation table coins et seed coins

        try {
            await coinsService.dao.db.query("CREATE TABLE public.coins(id_coins TEXT PRIMARY KEY, symbol TEXT, name TEXT, description TEXT, creation_date DATE, logo TEXT NOT NULL, homepage BOOLEAN DEFAULT(false))")
            // INSERT
            coinsService.insert(new Coins("bitcoin",
                                          "BTC",
                                          "Bitcoin",
                                          `Le bitcoin est une monnaie virtuelle créée en 2009 par une personne non identifiée dont le pseudonyme est Satoshi Nakamoto. Contrairement aux monnaies classiques (également appelées monnaie fiat), le bitcoin n'est pas émis et administré par une autorité bancaire. Il est émis sur le protocole blockchain du même nom. Cette technologie permet de stocker et transmettre des informations de manière transparente, sécurisée et sans organe central de contrôle. Le bitcoin, comme beaucoup d'autres crypto-monnaies, est mis en circulation via le minage. Les "mineurs", des personnes réparties partout dans le monde, effectuent des calculs mathématiques avec leur matériel informatique pour le réseau bitcoin afin de confirmer les transactions et augmenter leur sécurité. En échange, ils reçoivent des bitcoins. Ils peuvent ensuite être convertis en monnaie fiat ou être échangés contre d'autres crypto-monnaies sur des plateformes d'échange.`,
                                          new Date("2009-01-03"),
                                          "/pictures/coins/bitcoin.png",
                                          true
                                          )
                                ).then(res => console.log(res)).catch(e => console.log(e))
            coinsService.insert(new Coins("ethereum",
                                          "ETH",
                                          "Ethereum",
                                          `Ethereum est un protocole blockchain imaginé par Vitalik Buterin, un développeur russo-canadien. La blockchain est une technologie qui permet de stocker et transmettre des informations de manière transparente, sécurisée et sans organe central de contrôle. Lancé en 2015, Ethereum, deuxième blockchain en termes de valorisation après Bitcoin, permet de développer des applications décentralisées, appelées Dapps. Elle est différente de Bitcoin, qui est uniquement focalisé sur le paiement de pair à pair. Des dizaines de milliers de développeurs construisent des applications sur Ethereum pour les secteurs de la finance, le divertissement, le cloud ou encore l'immobilier. La communauté de développeurs de la blockchain Ethereum est d'ailleurs l'une des plus grandes et actives au monde.`,
                                          new Date("2015-07-30"),
                                          "/pictures/coins/ethereum.png",
                                          true
                                          )
                                ).then(res => console.log(res)).catch(e => console.log(e))
            coinsService.insert(new Coins("binancecoin",
                                          "BNB",
                                          "Binance Coin",
                                          `Binance Coin (BNB) est la crypto monnaie de la célèbre bourse d’échange Binance. Les jetons furent émis en juillet 2017, lorsque la start-up collecta environ 15 millions de dollars auprès d’investisseurs privés (à 10 centimes le BNB). Il s’agissait au départ de jetons Ethereum ERC20. Depuis, les BNB ont migré vers la chaîne de blocs maison de Binance, Binance Chain.`,
                                          new Date("2017-07-14"),
                                          "/pictures/coins/binancecoin.png",
                                          true
                                          )
                                ).then(res => console.log(res)).catch(e => console.log(e))
            coinsService.insert(new Coins("tether",
                                          "USDT",
                                          "Tether USD",
                                          `Le Tether, dont le sigle boursier est USDT, est un stablecoin émis sur différentes blockchains et dont la valeur est adossée à celle du dollar américain (USD). Créé en 2014, il joue un rôle primordial dans l’écosystème des crypto-actifs : son cours reste toujours proche des 1$ et permet de se protéger rapidement de la volatilité du marché sans pour autant échanger ses crypto-actifs contre une monnaie fiduciaire.`,
                                          new Date("2014-10-06"),
                                          "/pictures/coins/tether.png",
                                          true
                                          )
                                ).then(res => console.log(res)).catch(e => console.log(e))
            coinsService.insert(new Coins("usd-coin",
                                          "USDC",
                                          "USD Coin",
                                          `L'USD Coin (USDC) est un stablecoin ancré à la valeur du dollar américain à un ratio de 1:1. Chaque unité en circulation est fixée à 1$ maintenu en réserve, dans un mélange d'espèces et de bons du Trésor américain à court-terme. Le consortiu Centre, qui soutient cet actif, affirme que l'USDC est émis par des institutions financières réglementées. Ce stablecoin a été lancé en septembre 2018 sur une base limitée. Pour faire court, la devise de l'USD Coin est "de l'argent numérique pour l'ère du numérique". Ce stablecoin est conçu pour un monde où les transactions sans espèces sont de plus en plus courantes.`,
                                          new Date("2018-09-01"),
                                          "/pictures/coins/usd-coin.png",
                                          true
                                          )
                                ).then(res => console.log(res)).catch(e => console.log(e))
            coinsService.insert(new Coins("solana",
                                          "SOL",
                                          "Solana",
                                          `Solana est une blockchain qui s’efforce de résoudre certains des problèmes les plus urgents du secteur : améliorer la vitesse et la scalabilité, sans sacrifier la décentralisation ou la sécurité du réseau. Solana vise à résoudre le problème de la scalabilité grâce à son protocole haute performance. En effet, le projet met en œuvre une architecture temporelle révolutionnaire, un mécanisme de traitement des transactions et un modèle de propagation des informations plus efficace que les autres blockchains. L'infrastructure ouverte de Solana permet aussi aux développeurs de déployer facilement des DApps. L’objectif ultime serait donc de résoudre le trilemme de la blockchain. Le trilemme suppose qu’un réseau décentralisé ne peut satisfaire que deux des trois propriétés suivantes : décentralisation, sécurité et scalabilité. Enfin, Solana se targue d’être la blockchain la plus rapide du monde. En effet, le réseau Solana serait en mesure de traiter 50 000 transactions par seconde(TPS).`,
                                          new Date("2020-03-01"),
                                          "/pictures/coins/solana.png",
                                          false
                                          )
                                ).then(res => console.log(res)).catch(e => console.log(e))
            coinsService.insert(new Coins("ripple",
                                          "XRP",
                                          "Ripple",
                                          `Le XRP a été développé par Ripple pour devenir une alternative plus rapide, évolutive et moins coûteuse à tout autre actif électronique et plateforme de paiement monétaire comme le SWIFT. Le ledger de RippleNet est entretenu par la XRP Community, au sein de laquelle la société Ripple exerce son rôle de membre actif. Le XRP Ledger traite les transactions toutes les 3 à 5 secondes environ, ou à chaque fois qu’un noeud validateur indépendant arrive à un consensus, à la fois sur l’ordre et la validité des transactions XRP – contrairement au minage Proof-of-Work comme celui du Bitcoin (BTC).`,
                                          new Date("2012-09-01"),
                                          "/pictures/coins/ripple.png",
                                          false
                                          )
                                ).then(res => console.log(res)).catch(e => console.log(e))
            coinsService.insert(new Coins("terra-luna",
                                          "LUNA",
                                          "Terra",
                                          `Terra est un protocole de chaîne de blocs qui utilise des pièces stables à ancrage fiat pour alimenter des systèmes de paiement mondiaux à prix stables. Selon son livre blanc, Terra combine la stabilité des prix et l'adoption généralisée des monnaies fiduciaires avec la résistance à la censure du Bitcoin (BTC) et propose des règlements rapides et abordables. Le développement sur Terra a commencé en janvier 2018 et son réseau principal a été officiellement lancé en avril 2019. Depuis septembre 2021, il propose des pièces stables indexées sur le dollar américain, le won sud-coréen, le tugrik mongol et le panier de devises des droits de tirage spéciaux du Fonds monétaire international - et il a l'intention de déployer des options supplémentaires. Le jeton natif de Terra, LUNA, est utilisé pour stabiliser le prix des stablecoins du protocole. Les détenteurs de LUNA peuvent également soumettre et voter sur des propositions de gouvernance, ce qui lui confère la fonctionnalité d'un jeton de gouvernance.`,
                                          new Date("2019-04-01"),
                                          "/pictures/coins/terra-luna.png",
                                          false
                                          )
                                ).then(res => console.log(res)).catch(e => console.log(e))
            coinsService.insert(new Coins("cardano",
                                          "ADA",
                                          "Cardano",
                                          `Le Cardano est une plateforme blockchain qui s'appuie sur la preuve d'enjeu et dont l'objectif est de permettre « aux créateurs de solutions, aux innovateurs et aux visionnaires » d'amener un changement positif global. Ce projet open source vise aussi à « transférer aux individus le pouvoir des structures qui n'ont pas à rendre compte de leurs profits » afin de construire une société plus sûre, plus transparente et plus équitable. Le Cardano a été créé en 2017, le jeton ADA étant conçu pour s'assurer que les propriétaires puissent participer aux opérations du réseau. Grâce à cela, ceux qui détiennent la cryptomonnaie ont la possibilité de voter pour chaque changement proposé pour le logiciel.`,
                                          new Date("2017-09-23"),
                                          "/pictures/coins/cardano.png",
                                          false
                                          )
                                ).then(res => console.log(res)).catch(e => console.log(e))
            coinsService.insert(new Coins("avalanche-2",
                                          "AVAX",
                                          "Avalanche",
                                          `L'Avalanche est une plateforme qui permet le lancement d'applications, d'actifs financiers, de tradings et d'autres services de finance décentralisée (DeFi). Ce projet aspire à devenir une sorte de plateforme globale d'échange d'actifs, qui permettrait à n'importe qui de lancer ou d'échanger tout type d'actif et de le contrôler de manière décentralisée par le biais de contrats intelligents et d'autres technologies dernier cri. Les développeurs d'Ava Labs affirment qu'Avalanche est le premier réseau de contrats intelligents qui finalise les transactions en moins d'une seconde. Avalanche a lancé son mainnet en septembre 2020. Le jeton natif de la plateforme, l'AVAX, remplit différentes tâches au sein du réseau et fonctionne comme système de récompense et de paiement entre utilisateurs.`,
                                          new Date("2020-09-01"),
                                          "/pictures/coins/avalanche-2.png",
                                          false
                                          )
                                ).then(res => console.log(res)).catch(e => console.log(e))                
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table coins déjà créé")
            } 
            else {
                reject(e)
                console.log(e)
            }
        }

        //creation table users et seed user admin

        try{
            await usersService.dao.db.query("CREATE TABLE public.users(id_user SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, pseudo TEXT NOT NULL, avatar TEXT NOT NULL, disable BOOL)")
            
            //INSERT

            usersService.insert(new Users("admin@admin.com",
                                          "admin",
                                          "administrator",
                                          "/pictures/avatars/defaultavatar.jpg",
                                          false
                                         )
            ).then(res => console.log(res)).catch(e => console.log(e))

        }
        catch(e){
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table users déjà créé")
            } 
            else {
                reject(e)
                console.log(e)
            }
        }

        //creation table rights et seed rights

        try{
            await rightsService.dao.db.query("CREATE TABLE public.rights(id_right SERIAL PRIMARY KEY, label TEXT UNIQUE NOT NULL)")
            
            //INSERT

            rightsService.insert(new Rights("ROLE_USER")).then(res => console.log(res)).catch(e => console.log(e))
            rightsService.insert(new Rights("ROLE_MODERATOR")).then(res => console.log(res)).catch(e => console.log(e))
            rightsService.insert(new Rights("ROLE_EDITOR")).then(res => console.log(res)).catch(e => console.log(e))
            rightsService.insert(new Rights("ROLE_ADMIN")).then(res => console.log(res)).catch(e => console.log(e))
        }
        catch(e){
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table rights déjà créé")
            } 
            else {
                reject(e)
                console.log(e)
            }
        }

        //creation table usersrights et seed usersrights admin

        try{
            await usersrightsService.dao.db.query("CREATE TABLE public.usersrights(id_userright SERIAL PRIMARY KEY, id_user INT REFERENCES public.users(id_user), id_right INT REFERENCES public.rights(id_right))")
        
            usersrightsService.insert(new UsersRights(1,1)).then(res => console.log(res)).catch(e => console.log(e))
            usersrightsService.insert(new UsersRights(1,2)).then(res => console.log(res)).catch(e => console.log(e))
            usersrightsService.insert(new UsersRights(1,3)).then(res => console.log(res)).catch(e => console.log(e))
            usersrightsService.insert(new UsersRights(1,4)).then(res => console.log(res)).catch(e => console.log(e))
        }
        catch(e){
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table usersrights déjà créé")
            } 
            else {
                reject(e)
                console.log(e)
            }
        }

        //creation table articles

        try{
            await articlesService.dao.db.query("CREATE TABLE public.articles(id_article SERIAL PRIMARY KEY, title TEXT NOT NULL, publish_date TIMESTAMPTZ NOT NULL, content TEXT NOT NULL, thumbnail TEXT, visible BOOL, id_user INT REFERENCES public.users(id_user))")
        }
        catch(e){
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table articles déjà créé")
            } 
            else {
                reject(e)
                console.log(e)
            }
        }

        //creation table comments

        try{
            await commentsService.dao.db.query("CREATE TABLE public.comments(id_comment SERIAL PRIMARY KEY, writing_date TIMESTAMPTZ NOT NULL, comment TEXT NOT NULL, visible BOOL, id_article INT REFERENCES public.articles(id_article) ON DELETE CASCADE, id_user INT REFERENCES public.users(id_user))")
        }
        catch(e){
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table comments déjà créé")
            } 
            else {
                reject(e)
                console.log(e)
            }
        }

        //creation table announcments

        try{
            await announcementsService.dao.db.query("CREATE TABLE public.announcements(id_announcement SERIAL PRIMARY KEY, start_date DATE NOT NULL, end_date DATE NOT NULL, message TEXT NOT NULL)")
        
            announcementsService.insert(new Announcements(new Date("1900-01-01"), new Date("1900-01-01"), "Message par défaut"))
        }
        catch(e){
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table announcements déjà créé")
            } 
            else {
                reject(e)
                console.log(e)
            }
        }

        //creation table categorytopics + seed categorytopic

        try{
            await categorytopicService.dao.db.query("CREATE TABLE public.categorytopic(id_categorytopic SERIAL PRIMARY KEY, category TEXT NOT NULL)")

            await categorytopicService.dao.insert(new CategoryTopic("Actu"))
            await categorytopicService.dao.insert(new CategoryTopic("Exchange décentralisé"))
            await categorytopicService.dao.insert(new CategoryTopic("Exchange centralisé"))
            await categorytopicService.dao.insert(new CategoryTopic("Crypto"))
            await categorytopicService.dao.insert(new CategoryTopic("NFT"))
            await categorytopicService.dao.insert(new CategoryTopic("Jeux"))
        }
        catch(e){
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table categorytopic déjà créé")
            } 
            else {
                reject(e)
                console.log(e)
            }
        }

        //creation table topics + seed

        try{
            await topicsService.dao.db.query("CREATE TABLE public.topics(id_topic SERIAL PRIMARY KEY, title TEXT NOT NULL, publish_date TIMESTAMPTZ NOT NULL, content TEXT NOT NULL, closed BOOL, category INT REFERENCES public.categorytopic(id_categorytopic), id_user INT REFERENCES public.users(id_user))")
        
            await topicsService.dao.insert(new Topics("Titre1", new Date("2022-05-05"), "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum dui sit amet libero ullamcorper eleifend. Morbi et ullamcorper libero, eu ultrices metus. Aenean dolor lorem, pellentesque a dignissim non, iaculis non mauris. Nullam risus felis, posuere quis dolor vel, lacinia pulvinar quam. Fusce tristique condimentum elementum. Praesent ut neque dapibus, iaculis diam sed, tempor purus. Nullam vulputate hendrerit tortor dignissim condimentum. Vivamus vestibulum nibh non gravida tincidunt. Vestibulum et dolor condimentum, fermentum lacus in, malesuada velit. Integer ut tortor tempus, cursus nibh nec, accumsan turpis. Vivamus ornare nulla quis ultrices consectetur. Quisque eget neque elit. Nullam a enim non ligula condimentum malesuada sed sed lectus. Aenean metus quam, suscipit non blandit sed, scelerisque non eros. Mauris blandit vel felis ac cursus. Etiam a porttitor est.", false, 1, 1))
            await topicsService.dao.insert(new Topics("Titre2", new Date("2022-05-06"), "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum dui sit amet libero ullamcorper eleifend. Morbi et ullamcorper libero, eu ultrices metus. Aenean dolor lorem, pellentesque a dignissim non, iaculis non mauris. Nullam risus felis, posuere quis dolor vel, lacinia pulvinar quam. Fusce tristique condimentum elementum. Praesent ut neque dapibus, iaculis diam sed, tempor purus. Nullam vulputate hendrerit tortor dignissim condimentum. Vivamus vestibulum nibh non gravida tincidunt. Vestibulum et dolor condimentum, fermentum lacus in, malesuada velit. Integer ut tortor tempus, cursus nibh nec, accumsan turpis. Vivamus ornare nulla quis ultrices consectetur. Quisque eget neque elit. Nullam a enim non ligula condimentum malesuada sed sed lectus. Aenean metus quam, suscipit non blandit sed, scelerisque non eros. Mauris blandit vel felis ac cursus. Etiam a porttitor est.", true, 2, 1))
            await topicsService.dao.insert(new Topics("Titre3", new Date("2022-05-07"), "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum dui sit amet libero ullamcorper eleifend. Morbi et ullamcorper libero, eu ultrices metus. Aenean dolor lorem, pellentesque a dignissim non, iaculis non mauris. Nullam risus felis, posuere quis dolor vel, lacinia pulvinar quam. Fusce tristique condimentum elementum. Praesent ut neque dapibus, iaculis diam sed, tempor purus. Nullam vulputate hendrerit tortor dignissim condimentum. Vivamus vestibulum nibh non gravida tincidunt. Vestibulum et dolor condimentum, fermentum lacus in, malesuada velit. Integer ut tortor tempus, cursus nibh nec, accumsan turpis. Vivamus ornare nulla quis ultrices consectetur. Quisque eget neque elit. Nullam a enim non ligula condimentum malesuada sed sed lectus. Aenean metus quam, suscipit non blandit sed, scelerisque non eros. Mauris blandit vel felis ac cursus. Etiam a porttitor est.", false, 2, 1))
            await topicsService.dao.insert(new Topics("Titre4", new Date("2022-05-08"), "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum dui sit amet libero ullamcorper eleifend. Morbi et ullamcorper libero, eu ultrices metus. Aenean dolor lorem, pellentesque a dignissim non, iaculis non mauris. Nullam risus felis, posuere quis dolor vel, lacinia pulvinar quam. Fusce tristique condimentum elementum. Praesent ut neque dapibus, iaculis diam sed, tempor purus. Nullam vulputate hendrerit tortor dignissim condimentum. Vivamus vestibulum nibh non gravida tincidunt. Vestibulum et dolor condimentum, fermentum lacus in, malesuada velit. Integer ut tortor tempus, cursus nibh nec, accumsan turpis. Vivamus ornare nulla quis ultrices consectetur. Quisque eget neque elit. Nullam a enim non ligula condimentum malesuada sed sed lectus. Aenean metus quam, suscipit non blandit sed, scelerisque non eros. Mauris blandit vel felis ac cursus. Etiam a porttitor est.", true, 1, 1))
            await topicsService.dao.insert(new Topics("Titre5", new Date("2022-05-09"), "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum dui sit amet libero ullamcorper eleifend. Morbi et ullamcorper libero, eu ultrices metus. Aenean dolor lorem, pellentesque a dignissim non, iaculis non mauris. Nullam risus felis, posuere quis dolor vel, lacinia pulvinar quam. Fusce tristique condimentum elementum. Praesent ut neque dapibus, iaculis diam sed, tempor purus. Nullam vulputate hendrerit tortor dignissim condimentum. Vivamus vestibulum nibh non gravida tincidunt. Vestibulum et dolor condimentum, fermentum lacus in, malesuada velit. Integer ut tortor tempus, cursus nibh nec, accumsan turpis. Vivamus ornare nulla quis ultrices consectetur. Quisque eget neque elit. Nullam a enim non ligula condimentum malesuada sed sed lectus. Aenean metus quam, suscipit non blandit sed, scelerisque non eros. Mauris blandit vel felis ac cursus. Etiam a porttitor est.", false, 3, 1))
            await topicsService.dao.insert(new Topics("Titre6", new Date("2022-05-10"), "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum dui sit amet libero ullamcorper eleifend. Morbi et ullamcorper libero, eu ultrices metus. Aenean dolor lorem, pellentesque a dignissim non, iaculis non mauris. Nullam risus felis, posuere quis dolor vel, lacinia pulvinar quam. Fusce tristique condimentum elementum. Praesent ut neque dapibus, iaculis diam sed, tempor purus. Nullam vulputate hendrerit tortor dignissim condimentum. Vivamus vestibulum nibh non gravida tincidunt. Vestibulum et dolor condimentum, fermentum lacus in, malesuada velit. Integer ut tortor tempus, cursus nibh nec, accumsan turpis. Vivamus ornare nulla quis ultrices consectetur. Quisque eget neque elit. Nullam a enim non ligula condimentum malesuada sed sed lectus. Aenean metus quam, suscipit non blandit sed, scelerisque non eros. Mauris blandit vel felis ac cursus. Etiam a porttitor est.", true, 3, 1))
            await topicsService.dao.insert(new Topics("Titre7", new Date("2022-05-11"), "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum dui sit amet libero ullamcorper eleifend. Morbi et ullamcorper libero, eu ultrices metus. Aenean dolor lorem, pellentesque a dignissim non, iaculis non mauris. Nullam risus felis, posuere quis dolor vel, lacinia pulvinar quam. Fusce tristique condimentum elementum. Praesent ut neque dapibus, iaculis diam sed, tempor purus. Nullam vulputate hendrerit tortor dignissim condimentum. Vivamus vestibulum nibh non gravida tincidunt. Vestibulum et dolor condimentum, fermentum lacus in, malesuada velit. Integer ut tortor tempus, cursus nibh nec, accumsan turpis. Vivamus ornare nulla quis ultrices consectetur. Quisque eget neque elit. Nullam a enim non ligula condimentum malesuada sed sed lectus. Aenean metus quam, suscipit non blandit sed, scelerisque non eros. Mauris blandit vel felis ac cursus. Etiam a porttitor est.", false, 4, 1))
            await topicsService.dao.insert(new Topics("Titre8", new Date("2022-05-12"), "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum dui sit amet libero ullamcorper eleifend. Morbi et ullamcorper libero, eu ultrices metus. Aenean dolor lorem, pellentesque a dignissim non, iaculis non mauris. Nullam risus felis, posuere quis dolor vel, lacinia pulvinar quam. Fusce tristique condimentum elementum. Praesent ut neque dapibus, iaculis diam sed, tempor purus. Nullam vulputate hendrerit tortor dignissim condimentum. Vivamus vestibulum nibh non gravida tincidunt. Vestibulum et dolor condimentum, fermentum lacus in, malesuada velit. Integer ut tortor tempus, cursus nibh nec, accumsan turpis. Vivamus ornare nulla quis ultrices consectetur. Quisque eget neque elit. Nullam a enim non ligula condimentum malesuada sed sed lectus. Aenean metus quam, suscipit non blandit sed, scelerisque non eros. Mauris blandit vel felis ac cursus. Etiam a porttitor est.", false, 5, 1))
            await topicsService.dao.insert(new Topics("Titre9", new Date("2022-05-13"), "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum dui sit amet libero ullamcorper eleifend. Morbi et ullamcorper libero, eu ultrices metus. Aenean dolor lorem, pellentesque a dignissim non, iaculis non mauris. Nullam risus felis, posuere quis dolor vel, lacinia pulvinar quam. Fusce tristique condimentum elementum. Praesent ut neque dapibus, iaculis diam sed, tempor purus. Nullam vulputate hendrerit tortor dignissim condimentum. Vivamus vestibulum nibh non gravida tincidunt. Vestibulum et dolor condimentum, fermentum lacus in, malesuada velit. Integer ut tortor tempus, cursus nibh nec, accumsan turpis. Vivamus ornare nulla quis ultrices consectetur. Quisque eget neque elit. Nullam a enim non ligula condimentum malesuada sed sed lectus. Aenean metus quam, suscipit non blandit sed, scelerisque non eros. Mauris blandit vel felis ac cursus. Etiam a porttitor est.", false, 1, 1))
            await topicsService.dao.insert(new Topics("Titre10", new Date("2022-05-14"), "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum dui sit amet libero ullamcorper eleifend. Morbi et ullamcorper libero, eu ultrices metus. Aenean dolor lorem, pellentesque a dignissim non, iaculis non mauris. Nullam risus felis, posuere quis dolor vel, lacinia pulvinar quam. Fusce tristique condimentum elementum. Praesent ut neque dapibus, iaculis diam sed, tempor purus. Nullam vulputate hendrerit tortor dignissim condimentum. Vivamus vestibulum nibh non gravida tincidunt. Vestibulum et dolor condimentum, fermentum lacus in, malesuada velit. Integer ut tortor tempus, cursus nibh nec, accumsan turpis. Vivamus ornare nulla quis ultrices consectetur. Quisque eget neque elit. Nullam a enim non ligula condimentum malesuada sed sed lectus. Aenean metus quam, suscipit non blandit sed, scelerisque non eros. Mauris blandit vel felis ac cursus. Etiam a porttitor est.", false, 3, 1))
            await topicsService.dao.insert(new Topics("Titre11", new Date("2022-05-15"), "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum dui sit amet libero ullamcorper eleifend. Morbi et ullamcorper libero, eu ultrices metus. Aenean dolor lorem, pellentesque a dignissim non, iaculis non mauris. Nullam risus felis, posuere quis dolor vel, lacinia pulvinar quam. Fusce tristique condimentum elementum. Praesent ut neque dapibus, iaculis diam sed, tempor purus. Nullam vulputate hendrerit tortor dignissim condimentum. Vivamus vestibulum nibh non gravida tincidunt. Vestibulum et dolor condimentum, fermentum lacus in, malesuada velit. Integer ut tortor tempus, cursus nibh nec, accumsan turpis. Vivamus ornare nulla quis ultrices consectetur. Quisque eget neque elit. Nullam a enim non ligula condimentum malesuada sed sed lectus. Aenean metus quam, suscipit non blandit sed, scelerisque non eros. Mauris blandit vel felis ac cursus. Etiam a porttitor est.", false, 5, 1))
            await topicsService.dao.insert(new Topics("Titre12", new Date("2022-06-01"), "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum dui sit amet libero ullamcorper eleifend. Morbi et ullamcorper libero, eu ultrices metus. Aenean dolor lorem, pellentesque a dignissim non, iaculis non mauris. Nullam risus felis, posuere quis dolor vel, lacinia pulvinar quam. Fusce tristique condimentum elementum. Praesent ut neque dapibus, iaculis diam sed, tempor purus. Nullam vulputate hendrerit tortor dignissim condimentum. Vivamus vestibulum nibh non gravida tincidunt. Vestibulum et dolor condimentum, fermentum lacus in, malesuada velit. Integer ut tortor tempus, cursus nibh nec, accumsan turpis. Vivamus ornare nulla quis ultrices consectetur. Quisque eget neque elit. Nullam a enim non ligula condimentum malesuada sed sed lectus. Aenean metus quam, suscipit non blandit sed, scelerisque non eros. Mauris blandit vel felis ac cursus. Etiam a porttitor est.", false, 6, 1))

        }
        catch(e){
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table topics déjà créé")
            } 
            else {
                reject(e)
                console.log(e)
            }
        }

        //creation table posts + seed

        try{
            await postsService.dao.db.query("CREATE TABLE public.posts(id_post SERIAL PRIMARY KEY, writing_date TIMESTAMPTZ NOT NULL, post TEXT NOT NULL, visible BOOL, id_topic INT REFERENCES public.topics(id_topic) ON DELETE CASCADE, id_user INT REFERENCES public.users(id_user))")
        
            await postsService.dao.insert(new Posts(new Date("2022-05-11"), "Post 1", true, 1, 1))
            await postsService.dao.insert(new Posts(new Date("2022-05-12"), "**insultes**", false, 2, 1))
            await postsService.dao.insert(new Posts(new Date("2022-05-15"), "Post 3", true, 3, 1))
            await postsService.dao.insert(new Posts(new Date("2022-05-08"), "Post 4", true, 1, 1))
            await postsService.dao.insert(new Posts(new Date("2022-04-09"), "Post 5", true, 5, 1))
            await postsService.dao.insert(new Posts(new Date("2022-05-13"), "Post 6", true, 1, 1))
        }
        catch(e){
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table posts déjà créé")
            } 
            else {
                reject(e)
                console.log(e)
            }
        }

        //creation table userscoins + seed

        try{
            await userscoinsService.dao.db.query("CREATE TABLE public.userscoins(id_userscoins SERIAL PRIMARY KEY, buying_date TIMESTAMPTZ NOT NULL, buying_price FLOAT NOT NULL, quantity FLOAT NOT NULL, id_coins TEXT REFERENCES public.coins(id_coins), id_user INT REFERENCES public.users(id_user))")
        
            userscoinsService.dao.insert(new UsersCoins(new Date("2022-05-05 15:08:00"), 80.66, 15, "solana", 1)).then(res => console.log(res)).catch(e => console.log(e))
            userscoinsService.dao.insert(new UsersCoins(new Date("2022-05-03 11:24:36"), 56.22, 4, "avalanche-2", 1)).then(res => console.log(res)).catch(e => console.log(e))
        }
        catch(e){
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table userscoins déjà créé")
            } 
            else {
                reject(e)
                console.log(e)
            }
        }

        //creation table websites + seed

        try{
            await websitesService.dao.db.query("CREATE TABLE public.websites(id_website SERIAL PRIMARY KEY, url TEXT NOT NULL, fraudulent BOOL NOT NULL, id_user INT REFERENCES public.users(id_user))")
        
            websitesService.dao.insert(new Websites("https://binance.com/", false, 1)).then(res => console.log(res)).catch(e => console.log(e))
            websitesService.dao.insert(new Websites("https://binance.info/", true, 1)).then(res => console.log(res)).catch(e => console.log(e))
        }
        catch(e){
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table websites déjà créé")
            } 
            else {
                reject(e)
                console.log(e)
            }
        }
    })
}