const express = require('express');
const routerStudent = require('./student.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/students',routerStudent)

module.exports = router;