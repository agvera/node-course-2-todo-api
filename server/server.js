require('./config/config')

const _ = require('lodash')
const {ObjectID} = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo.js')
const {User} = require('./models/user.js')
const {authenticate} = require('./middleware/authenticate')

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())

app.post('/todos', authenticate, (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _createdBy: req.user._id
    })

    todo.save().then((doc)=>{
        res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _createdBy: req.user._id
    }).then((todos) => {
        res.send({todos})
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/todos/:id', authenticate, (req,res) => {
    const id = req.params.id

    // Valid id using isValid
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }

    Todo.findOne({
        _id: id,
        _createdBy: req.user._id
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((e) => {
        return res.status(400).send()
    })
})

app.delete('/todos/:id', authenticate, (req,res) => {

    const id = req.params.id

    // Valid id using isValid
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }

    Todo.findOneAndRemove({
        _id: id,
        _createdBy: req.user._id
    }).then((todo) => {
        if(!todo) {
            res.send(id)
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((e) => {
        return res.status(400).send()
    })

})

app.patch('/todos/:id', authenticate, (req,res) => {
    
    const id = req.params.id
    const body = _.pick(req.body,['text', 'completed'])

    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false
        body.completedAt = null
    }

    Todo.findOneAndUpdate({_id: id, _createdBy: req.user._id}, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            res.status(404).send()
        }
        res.send({todo})
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.post('/users', (req,res) => {
    
    const body = _.pick(req.body,['email', 'password'])
    const user = new User(body)

    user.save().then(() => {
        return user.generateAuthToken()
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
    
})

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)
})

app.post('/users/login', (req,res) => {
    
    const body = _.pick(req.body,['email', 'password'])
    
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user)
        })
    }).catch((e) => {
        res.status(400).send()
    })

})

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        req.status(200).send()
    }, () => {
        res.status(400).send()
    }).catch((e) => {
        res.send(e)
    })
})

app.listen(port,() => {
    console.log(`Started on port ${port}`)
})

module.exports = {app}