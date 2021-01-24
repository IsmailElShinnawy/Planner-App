const express = require('express');
const listController = require('../controllers/listController');

const router = express.Router();

router.get('/create', listController.list_create_get);
router.post('/create', listController.list_create_post);
router.get('/:id', listController.list_details_get);
router.put('/edit/additem/:id', listController.list_additem_put);
router.delete('/edit/deleteitem/:listid/:idx', listController.list_deleteitem_delete);
router.delete('/delete/:listid', listController.list_delete);

module.exports = router;