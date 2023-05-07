const express = require('express')

const app = express();
const db = require('./config/mongoose');

const passport = require('passport');
const admin_jwt = require('./config/passport-admin');
const manager_jwt = require('./config/passport-manager');
const employee_jwt = require('./config/passport-employees');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded());

app.use(cookieParser());

app.use('/', require('./routes/adminRouter'));

app.listen(port = 8001, (err) => {
    if (err) {
        console.log('server is not conneted');
        return false;
    }
    console.log('server is conneted', port);
});