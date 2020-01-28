const bc = require("bcryptjs")
const express = require("express")
const model = require("../routes/model")
const restrict = require("../middleware/restrict")

const router = express.Router()

router.post("/register", async (req, res, next) => {
    try {
    const savedUser = await model.add(req.body)
    return res.status(201).json(savedUser)
    } catch (err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await model.findBy({ username })
        .first()
        
        const passwordValid = await bc.compare(password, user.password)
        if (user && passwordValid) {
            req.session.user = user; //send cookie with this user information.

            return res.status(200).json({ welcomeMessage: `Welcome ${user.username}. You are now logged in.`, })
        } else {
            return res.status(401).json({ errorMessage: "Incorrect Username or Password", })
        }
    } catch (err) {
        next(err)
    }
})

router.get("/protected", restrict, async (req, res, next) => {
    try {
        return res.status(200).json({ successMessage: "You are authorized", })

    } catch (err) {
        next(err)
    }
})

router.get("/logout", restrict, (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            next(err)
        } else {
            return res.status(200).json({ successMessage: "Logged out." })
        }
    })
})


module.exports = router