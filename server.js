const express = require('express');
const helmet = require('helmet');
const session = require('express-session');

const server = express();
const userRoute = require('./routes/users');

server.use(express.json());
server.use(helmet());

server.use(session({
    name: 'session',
    secret: 'lukas',
    cookie: {
        expires: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
}));

server.use('/api', userRoute);

server.get('/', (request, response) => {
    response.status(200).send(`<h1>API ONLINE</h1>`)
})

module.exports = server;