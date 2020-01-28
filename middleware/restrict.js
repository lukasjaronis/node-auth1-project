module.exports = (req, res, next) => {

const authenticationError = {
    message: `Incorrect Username and Password.`
}

    if (!req.session && !req.session.user) {
        res.status(401).json(authenticationError)
    } else {
        next()
    }
}