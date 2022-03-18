const express = require('express');

//Controllers
const { 
        getAllUsers,  
        updateUser, 
        createNewUser,
        deleteUser, 
        getUserById,
     } = require('../controllers/user.controller')

const router = express.Router();

router.route('/')
    .get(getAllUsers)
    .post(createNewUser)

router.route('/:id')
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = {userRouter: router}