const passport = require('passport');

const jwtStrategy = require('passport-jwt').Strategy;

const extractJWT = require('passport-jwt').ExtractJwt;

const admindb = require('../model/adminModel');

passport.use('admin', new jwtStrategy({
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'coder'
}, async (tokenData, done) => {
    let checkAdmin = await admindb.findById(tokenData.token._id);

    if (checkAdmin) {
        return done(null, checkAdmin);
    }
    else {
        return done(null, false);
    }
}));

module.exports = passport;