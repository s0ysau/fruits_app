require('dotenv').config()
// Require modules
const fs = require('fs') // this engine requires the fs module like we did Saturday
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Fruit = require('./models/fruit')
// this makes 2 const fruits & veggies 

// Create our express app
const app = express()

// Configure the app (app.set)
/*Start Config */
app.use(express.urlencoded({ extended: true })) // This code makes us have req.body
app.engine('jsx', require('jsx-view-engine').createEngine())
app.set('view engine', 'jsx') // register the jsx view engine
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log('connected to MongoDB Atlas')
})


/* END CONFIG */

// Mount our middleware (app.use)

/*Start Middleware */


app.use(methodOverride('_method'))
app.use(express.static('public'))

/* END Middleware */

// Mount Routes
/*Start Routes */


// INDEX --- READ --- GET
app.get('/fruits', (req, res) => {
    Fruit.find({}, (err, foundFruits) => {
    if(err){
        console.error(err)
        res.status(400).send(err)
    } else {
        res.render('fruits/Index', {
        fruits: foundFruits
        })
    }
    })
})

// NEW (Not applicable in an api)
app.get('/fruits/new', (req, res) => {
    res.render('fruits/New')
})
// DELETE

app.delete('/fruits/:id', (req, res) => {
    Fruit.findByIdAndDelete((req.params.id), (err, deletedFruit) => {
        if (err) {
            console.error(err)
            res.status(400).send(err)
        } else {
            res.redirect('/fruits')
        }
    })
})

// UPDATE

app.put('/fruits/:id', (req, res) => {
    req.body.readyToEat === 'on' || req.body.readyToEat === true ? req.body.readyToEat = true : req.body.readyToEat = false
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedFruit) => {
        if(err){
            console.log(err)
            res.status(400).send(err)
        } else {
            res.redirect(`/fruits/${updatedFruit._id}`)
        }
    })
})

// CREATE
app.post('/fruits', (req, res) =>{
  // req.body which contains all of our form Data we will get from the user
req.body.readyToEat === 'on' ? req.body.readyToEat = true : req.body.readyToEat = false
Fruit.create(req.body, (err, createdFruit) => {
if(err){
    console.error(err)
    res.status(400).send(err)
} else {
    res.redirect('/fruits')
    // res.send(createdFruit)
}
})
})

// EDIT (not applicable in an api)
app.get('/fruits/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruits) => {
        if (err) {
            console.error(err)
            res.status(400).send(err)
        } else {
            res.render('fruits/Edit', {
                fruit: foundFruits
            })
        }
    })
})

// SHOW ---- READ ---- GET
app.get('/fruits/:id', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruits) => {
        if (err){
            console.error(err)
            res.status(400).send(err)
        } else {
            res.render('fruits/Show', {
                fruit: foundFruits
            })
        }
    })
})



/* END ROUTES */


// Tell the app to listen on a port
app.listen(3000, () => {
    console.log('Listening on Port 3000')
})