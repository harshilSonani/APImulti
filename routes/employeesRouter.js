const express = require('express')
const employeesC = require('../controller/employeesController');
const app = express.Router();
const passport = require('passport')

app.post('/insertemployees', passport.authenticate('manager', {session : false}) ,employeesC.insertemployees);

app.post('/epmloyeeLogin', employeesC.epmloyeeLogin)

app.get('/employeeProfile', employeesC.employeeProfile)

module.exports = app;