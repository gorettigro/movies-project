const express = require('express');

const { 
        getAllUsers,  
        updateUser, 
        createNewUser,
        loginUser,
        deleteUser, 
        getUserById,
     } = require('../controllers/user.controller')

//Midleware
const { validateSassion } = require('../middleware/validates.middleware')

const router = express.Router();

router.route('/')
    .get(validateSassion, getAllUsers)
    .post(createNewUser)

router.route('/:id')
    .get(alidateSassion, getUserById)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = {userRouter: router}