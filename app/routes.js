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
router.get('/edit',  confessionsController.editConfessions);
//seed confessions
router.get('/confessions/seed',  confessionsController.seedConfessions);

//create confessions
router.post('/confessions/create', confessionsController.processCreate);

//edit confessions
router.get('/edit',    confessionsController.showEdit);
router.post('/confessions/:id',        confessionsController.processEdit);

//delete confessions
router.get('/confessions/:id/delete', confessionsController.deleteConfession);
