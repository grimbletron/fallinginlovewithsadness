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
router.get('/moderated',  confessionsController.showModerated);
//seed confessions
router.get('/confessions/seed',  confessionsController.seedConfessions);

//create confessions
router.post('/create', confessionsController.processCreate);

//edit confessions
router.get('/edit',    confessionsController.showEdit);
router.post('/:id',        confessionsController.processEdit);

//delete confessions
router.get('/:id/delete', confessionsController.deleteConfession);
router.get('/:id/moderate', confessionsController.moderateConfession);
router.get('/:id/unmoderate', confessionsController.unmoderateConfession);