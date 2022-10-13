const RESOURCE_PATH = '/fruits'
const viewController = {
    index(req, res, next){
        res.render('fruits/Index', res.locals.data)
    },
    newView(req, res, next){
        res.render('fruits/New')
    },
    edit(req, res, next) {
        res.render('fruits/Edit', res.locals.data)
    },
    show(req, res, next){
        res.render('fruits/Show', res.locals.data)
    },
    redirectHome(req, res, next){
        res.redirect(RESOURCE_PATH)
    },
    redirectShow(req, res, next){
        res.redirect(`${RESOURCE_PATH}/${res.locals.data.fruit.id}`)
    }
}

module.exports = viewController 