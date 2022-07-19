const bcrypt = require('bcrypt')

module.exports = app => {
    const getHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null).then(hash => callback(hash))
        })
    }

    const save = (req, res) => {
        getHash(req.body.password, hash => {
            const password = hash
            
            app.db('users')
                .insert({
                    name: req.body.name,
                    email: req.body.email.toLowerCase(),
                    password: password
                })
                .then(() => res.status(201).send())
                .catch(error => res.status(400).json(error))
        })
    }

    return { save }
}