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

    // deleteMany, deleteOne, findOneAndDelete
    // db.collection('Todos').deleteMany({name: 'Angelino Vera'}).then((result)=>{
    //     console.log(result)
    // })
    // db.collection('Todos').deleteOne({name: 'Angelino Vera'}).then((result)=>{
    //     console.log(result)
    // })

    db.collection('Todos').findOneAndDelete({_id: new ObjectID('5be314587c42010393b5e72a')}).then((result) => {
        console.log(result)
    })
    // client.close()

})