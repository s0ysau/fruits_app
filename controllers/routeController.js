// Start our router
const express = require('express') // import express
// only the router none of the other app stuff 
const router = express.Router()
// Need the model bc the job of the model is to give us access to the DB
const dataController = require('./dataController')
const viewController = require('./viewController')

// Route
// Index
router.get('/', dataController.index, viewController.index)
// New
router.get('/new', viewController.newView )
// delete
router.delete('/:id', dataController.destroy, viewController.redirectHome)
// update
router.put('/:id', dataController.update, viewController.redirectShow)
// create
router.post('/', dataController.create, viewController.redirectShow) 
// edit
router.get('/:id/edit', dataController.show, viewController.edit)
// show
router.get('/:id', dataController.show, viewController.show)

module.exports = router