/*const usersDb = require("diskdb");
usersDb.connect("./db", ["users"]);*/
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy((username, password, done) => {
   /* let user;
    user.username = username;
    user.password = password;
    if (usersDb.users.findOne(user))
        return done(null, {username: "admin"});*/
    if (username === "admin" && password === "admin")
        return done(null, {username: "admin"}); 
    return done(null, false);
}));

passport.serializeUser((usr, done) => {
    done(null, user.username);
});

passport.deserializeUser((user, done) => {
    done(null, {username: username});
});

module.exports = passport;