const {MongoClient, ObjectID} = require('mongodb')

let id_a = new ObjectID
let id_b = new ObjectID 
console.log(id_a)
console.log(id_b)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if(err){
        return console.log('Unable to connect to MongoDB server')
    }

    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp')

    db.collection('Todos').insertOne({
        name: 'Angelino Vera',
        age: 30,
        location: 'Philippines'
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert todo', err)
        }

        console.log(JSON.stringify(result.ops, undefined, 2))
        // console.log(result.ops[0]._id.getTimestamp)
    })

    client.close()

})