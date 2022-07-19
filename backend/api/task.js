const moment = require('moment')

module.exports = app => {
    const list = (req, res) => {
        const date = req.query.date 
            ? req.query.date 
            : moment().endOf('day').toDate()
    
        app.db('tasks')
            .where({ userId: req.user.id })
            .where('estimateAt', '<=', date)
            .orderBy('estimateAt')
            .then(tasks => res.json(tasks))
            .catch(error => res.status(400).json(error))
    }

    const save = (req, res) => {
        if (!req.body.description.trim()) {
            return res.status(400).send('You must provide a description!')
        }

        req.body.userId = req.user.id
        req.body.estimateAt = moment(req.body.estimateAt).format("YYYY-MM-DD");
        // req.body.estimateAt = moment(req.body.estimateAt).toDate().format("YYYY-MM-DD hh:mm:ss - your required date format");
        // req.body.estimateAt = moment(req.body.estimateAt).toDate().format("YYYY-MM-DD hh:mm:ss - your required date format");
        // let current_date = moment('Your date input').format("YYYY-MM-DD hh:mm:ss - your required date format");

        app.db('tasks')
            .insert(req.body)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json(error))        
    }

    const remove = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .del()
            .then(rowsDeleted => rowsDeleted > 0 
                ? res.status(204).send()
                : res.status(400).send(`Task with id = ${req.params.id} not found.`))
    }

    const toggleTask = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .first()
            .then(task => {
                if(!task) {
                    return res.status(400).send(`Task with id = ${req.params.id} not found.`)
                }
                
                const doneAt = task.doneAt ? null : new Date()
                updateTaskDoneAt(req, res, doneAt)
            })
            .catch(error => res.status(400).json(error))
    }

    const updateTaskDoneAt = (req, res, doneAt) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .update({ doneAt })
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json(error))
    }
    
    return { list, remove, save, toggleTask }
}