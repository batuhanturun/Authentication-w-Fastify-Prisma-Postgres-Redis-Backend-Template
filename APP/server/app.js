const dotenv = require("dotenv").config({ path: "./.env" });

const fastify = require("fastify")({ logger: true });
const fastifyCors = require('@fastify/cors');
const fastifyCookie = require('@fastify/cookie');
const fastifySession = require('@fastify/session');
let RedisStore = require("connect-redis")(fastifySession);

const router = require("./src/router/authRouter");

const port = process.env.PORT

fastify.register(fastifyCors,{origin:true,methods:["GET","POST"]});
fastify.register(fastifyCookie);
fastify.register(require('@fastify/formbody'));
//init session store
const { createClient } = require("redis");
let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);
fastify.register(fastifySession, { 
    secret: process.env.SESSION_SECRET, 
    cookie: { secure: false }, 
    store: new RedisStore({ client: redisClient }) 
});

router.forEach((route, index) => {
    fastify.route(route)
})

const start = async () => {
    try {
        await fastify.listen({ port }).then(() => {
            console.log("Server connection Successful");
        }).catch((err) => {
            console.log("Server connection Error", err);
        })
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();