//create a new express router
const express = require('express')
router = express.Router();
mainController = require('./controllers/main.controller');
confessionsController = require('./controllers/confessions.controller')
//export router
module.exports = router;

//define routes
router.get('/', confessionsController.showConfessions);

//event routes
router.get('/confessions',  confessionsController.showConfessions);
//seed confessions
router.get('/confessions/seed',  confessionsController.seedConfessions);

//create confessions
router.get('/confessions/create', confessionsController.showCreate);
router.post('/confessions/create', confessionsController.processCreate);

//edit confessions
router.get('/edit',    confessionsController.showEdit);
router.post('/confessions/:slug',        confessionsController.processEdit);

//delete confessions
router.get('/confessions/:slug/delete', confessionsController.deleteConfession);

//show a single event
router.get('/confessions/:slug', confessionsController.showSingle);