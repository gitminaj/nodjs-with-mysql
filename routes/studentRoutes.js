const express = require('express');
const { getStudent, getStudentById, createUser } = require('../controllers/StudentController');

// router object
const router = express.Router();

// routes

// get all students route
router.get('/getall', getStudent);

// get students by id 

router.get('/get/:id', getStudentById );

// Create user

router.post('/create', createUser )


module.exports = router