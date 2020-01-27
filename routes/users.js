const express = require('express');
const bc = require('bcryptjs');
const router = express.Router();

const userDB = require('../data/helpers/usersDb');

router.post('/register', (req, res) => {
    const user = req.body;
    user.password = bc.hashSync(user.password, 8);

    userDB.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(error => {
        res.status(500).json({
            errorMsg: `Failed to add user. ${error}`
        })
    })

})

router.post('/login', (req, res) => {
    const user = req.body;

    userDB.get(user)
    .then(users => {
        if(users.length && bc.compareSync(user.password, users[0].password)) {
            req.session.username = users[0].username;
            res.json({
                welcomeMessage: `Welcome ${user}. You are now logged in.`
            })
        } else {
            res.status(404).json({
                errorMsg: `Incorrect username or password.`
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            errorMsg: `Nope. ${error}`
        })
    })
})

router.get('/users', (req, res) => {
    if(req.session && req.session.username) {
        userDB.findUsers()
        .then(users => {
            res.json(users)
        })
        .catch(error => {
            res.status(500).send(error)
        })
    } else {
        res.status(400).json({
            errorMsg: `Nope. `
        })
    }
})

module.exports = router;