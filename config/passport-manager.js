const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const jwtExtract = require('passport-jwt').ExtractJwt;
const managerdb = require('../model/managerModel');

passport.use('manager',new jwtStrategy({
    jwtFromRequest : jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'coder1', 
}, async (manager, done)=>{
    let data = await managerdb.findById(manager.token._id);

    if(data){
        return done(null,data);
    }
    else{
        return done(null,false);
    }
}));

module.exports = passport;