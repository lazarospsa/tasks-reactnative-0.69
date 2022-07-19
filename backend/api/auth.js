const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

const authKey = process.env.key

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('You must provide your email and password!')
        }

        const user = await app.db('users')
            .where({ email: req.body.email.toLowerCase() })
            .first()

        if (user) {
            bcrypt.compare(req.body.password, user.password, (error, matched) => {
                if (error || !matched) {
                    return res.status(401).send('You must provide the right password!')
                }

                const payload = { id: user.id }
                                
                res.json({
                    name: user.name,
                    email: user.email,
                    token: jwt.encode(payload, authKey)
                })
            })
        } else {
            res.status(400).send('User not found!')
        }
    }

    return { signin }
}