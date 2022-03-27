const express = require('express');
const { body } = require('express-validator');

const { 
        getAllUsers,  
        updateUser, 
        createNewUser,
        loginUser,
        deleteUser, 
        getUserById,
     } = require('../controllers/user.controller')

//Midleware
const {
    validateSession,
    protectAdmin
  } = require('../middlewares/validates.middleware');
  const {
    userExists,
    protectAccountOwner
  } = require('../middlewares/users.middleware');

const router = express.Router();

router.post('/', createNewUser)

router.post('/login', loginUser)

router.use(validateSession)

router.get('/', protectAdmin, getAllUsers)

router
    .use('/:id', userExists)
    .route('/:id')
    .get(getUserById)
    .patch(protectAccountOwner ,updateUser)
    .delete(protectAccountOwner ,deleteUser)

module.exports = {userRouter: router}