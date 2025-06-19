// userRoute.js
const express = require('express');
const router = express.Router();
const { create, getAlluser, getId, updateData, deleteUser } = require('../controller/userController');

router.post('/create', create);
router.get('/all', getAlluser);
router.get('/:id',getId);

router.put('/update/:id', updateData);

router.delete('/delete/:id',deleteUser);

module.exports = router;