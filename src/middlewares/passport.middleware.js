const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { findUserById, findUserByUsername } = require('../controllers/users');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    (username, password, done) => {
        findUserByUsername(username)
            .then(user => {
                if (!user)
                    return done(null, false, { message: 'Incorrect username.' });

                const isValid = bcrypt.compareSync(password, user.password);

                if (!isValid)
                    return done(null, false, { message: 'Incorrect password.' });

                return done(null, user);
            })
            .catch(err => {
                return done(null, false, err.message);
            })
    }
));

passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser((id, done) => {
    findUserById(id)
    .then(user => {
        return done(null, user);
    })
    .catch(err => {
        return done(err, null)
    });
});

module.exports = passport;