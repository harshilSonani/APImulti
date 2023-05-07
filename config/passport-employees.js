const passport = require("passport");

const jwtStrategy = require("passport-jwt").Strategy;
const extractJWT = require("passport-jwt").ExtractJwt;

const employeedb = require("../model/employeesModel");

passport.use('employees',new jwtStrategy({
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'coder3',
}, async (tokenData, done)=>{
    let employeeData = await employeedb.findById(tokenData.token._id);

    if(employeeData){
        return done(null,done);
    }
    else{
        return done(null,false);
    }
}));
module.exports = passport;