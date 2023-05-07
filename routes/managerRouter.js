const express = require('express')
const managerC = require('../controller/managerController');
const app = express.Router();
const passport = require('passport');

app.post('/insertManager', passport.authenticate('admin', {session : false}), managerC.insertManager);

app.post('/managerLogin', managerC.managerLogin);

app.get('/managerProfile', passport.authenticate('manager',{session : false}) , managerC.managerProfile);

app.get('/viewEmployees', managerC.viewEmployees)

module.exports = app;