const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

// import routers
const dbConfig = require("./data/db-config");
const authRouter = require('./auth/router');
const userRouter = require("./routes/router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session({
   
    resave: false, 
    saveUninitialized: false, 
    secret: "lukas",
    cookie: {
        httpOnly: true, 
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: false, 
    },
    store: new KnexSessionStore({
        knex: dbConfig,
        createtable: true,
    }),
}))
 
require("dotenv").config()

server.use("/users", userRouter)
server.use("/auth", authRouter)

module.exports = server;