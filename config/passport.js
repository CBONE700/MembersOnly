const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const db = require("../db/queries");
const validPassword = require('../lib/passwordUtils').validPassword;

const customFields = {
  usernameField: 'username',
  passwordField: 'password'
}

async function verifyCallback(username, password, done) {
  try {
    const user = await db.findUser(username);
  
    if (!user) {
      return done(null, false);
    }

    const isValid = validPassword(password, user.hash, user.salt);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false)
    }
  } catch (err) {
    return done(err);
  }
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await db.findUserById(userId);
    done(null, user);
  } catch (err) {
    done(err)
  }
});

