const passport = require('passport');
const server = require('express').Router();

server.post('/login', 
  passport.authenticate('local', { 
    successRedirect: '/v1/auth/profile',
    failureRedirect: '/v1/auth/failure',
    failureFlash: true
  })
)
  
module.exports = server;