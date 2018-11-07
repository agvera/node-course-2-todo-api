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

    //FindOneAndUpdate

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5be313a148bce6038e4b2840')
    }, {
        $set: {
            name: 'Angelino Vera'
        },$inc: {
            age: -2
        }
    },{
        returnNewDocument: true
    }).then((result) => {
        console.log(result)
    })

    // client.close()

})