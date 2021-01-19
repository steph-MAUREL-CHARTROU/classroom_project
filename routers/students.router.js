const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students.controller');
const auth = require ('../services/auth.service');


router.get('/',studentController.getAll);
router.get('/:id', studentController.getById);

//router.get('/add-student-to-lesson/:id1/:id2', studentController.addLesson);

//router.post('/', studentController.create);

//router.put('/:id', studentController.update);

///router.delete('/:id',studentController.remove);



module.exports = router;