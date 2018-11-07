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

    db.collection('Todos').find({
        _id: new ObjectID('5be1c66b782d6230c10fad29')
    }).toArray().then((docs)=>{
        console.log('Todos')
        console.log(docs)
        // console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
        console.log('Unable to fetch data', err)
    })
    

    // client.close()

})