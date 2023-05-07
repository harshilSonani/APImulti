const express = require('express')
const adminC = require('../controller/adminController');
const app = express.Router();

const passport = require('passport');

app.post('/insertAdmin', adminC.insertAdmin);

app.get('/adminRecord', passport.authenticate('admin', { session: false }), adminC.adminRecord);

app.post('/adminLogin', adminC.adminLogin);

app.get('/viewManager', passport.authenticate('admin', { session: false }), adminC.viewManager)


app.get('/viewEmployee', passport.authenticate('admin', { session: false }), adminC.viewEmployee)

// //   / / / / //  // / / // / / / / / // / / /

app.use('/manager', require('./managerRouter'));

app.use('/employees', require('../routes/employeesRouter'));

module.exports = app;