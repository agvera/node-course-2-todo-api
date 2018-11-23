const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

const id = '5bedaa7cb43b8703b8e156d2'

User.findById(id).then((user) => {
    if(!user) {
        return console.log('User not found')
    }
    console.log('User', user)
},(e) => console.log(e))

// if(!ObjectID.isValid(id)){
//     console.log(`Id not valid`)
// }


// Todo.find({
//     _id: id
// }).then((todo) => {
//     console.log('Todos', todo)
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo)
// })

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return ('ID not found')
//     }
//     console.log('Find by ID', todo)
// }).catch((e) => console.log(e))