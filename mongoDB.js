// //Connecting with MongoDB native driver
// const MongoClient = require('mongodb').MongoClient
// const url = 'mongodb://127.0.0.1:27017'

// const dbName = 'test'
// let db

// MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  }, (err, client) => {
//   if (err) return console.log(err)

//   // Storing a reference to the database so you can use it later
//   db = client.db(dbName)
//   console.log(`Connected MongoDB: ${url}`)
//   console.log(`Database: ${dbName}`)
// })

// const mongoose = require('mongoose')
// const url = 'mongodb://127.0.0.1:27017/test';
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  })
// const db = mongoose.connection
// db.once('open', _ => {
//   console.log('Database connected:', url)
// })

// db.on('error', err => {
//   console.error('connection error:', err)
// })