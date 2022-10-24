require('dotenv').config()
// Require modules
const express = require('express')
const methodOverride = require('method-override')
const db = require('./models/db')
const app = express()

// Configure the app (app.set)
/* Start Config */
// Creates res.locals.data
app.use(express.urlencoded({ extended: true })) // This code makes us have req.body
app.use(express.json())
app.use((req, res, next) => {
  res.locals.data = {}
  next()
})

/* Start Middleware */
app.engine('jsx', require('jsx-view-engine').createEngine())
app.set('view engine', 'jsx') // register the jsx view engine
db.once('open', () => {
  console.log('connected to MongoDB Atlas')
})


app.use(methodOverride('_method')) // Allows override method
app.use(express.static('public'))

//setting up /fruits as the entry 
app.use('/fruits', require('./controllers/routeController'))
/* END Middleware */

// Tell the app to listen on a port
app.listen(3000, () => {
  console.log('Listening on Port 3000')
})
