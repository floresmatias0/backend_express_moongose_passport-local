const { Router } = require('express');

//Importamos los routers
const getUsers = require('./users/get.users.js');
const postUsers = require('./users/post.users.js');
const putUsers = require('./users/put.users.js');

const getAuth = require('./auth/get.auth.js');
const postAuth = require('./auth/post.auth.js');

const router = Router();

// Configuramos los routers
router.use('/users', getUsers);
router.use('/users', postUsers);
router.use('/users', putUsers);

router.use('/auth', getAuth);
router.use('/auth', postAuth);


module.exports = router;