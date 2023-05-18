const express = require('express');
const { registerUser, getUsers, updateUser, removeUser } = require('../controllers/admin');
const { Auth, Authorize } = require('../middleware/auth');
const advancedResult = require('../middleware/advancedResult');
const User = require('../models/user');
const router = express.Router();
router.use(Auth);
//router.use(Authorize('ROLE_ADMIN'));

router.get('/getusers', Authorize('ROLE_ADMIN','ROLE_GARAGEDIRECTOR'), advancedResult(User), getUsers);
router.post('/register', registerUser);
router.put('/:id', updateUser);
router.put('/remove/:id', removeUser);

module.exports = router;
