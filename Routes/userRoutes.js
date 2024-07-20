const express = require('express')
const router = express.Router();
const userController = require('../Controllers/userController.js');
const { authenticate, restrict } = require('../middlewares/authentication.js');


router.get('/users', authenticate, userController.getAllUsers);
router.get('/users/:id', authenticate, userController.getUserDetails);
router.put('/users/:id', authenticate, userController.updateUser);
router.delete('/users/:id', authenticate, userController.deleteUser);

router.get('/users/profile/me', authenticate,  userController.getUserProfile);
// router.get('/users/appointments/my-appointments', authenticate, userController.getMyAppointments);
router.post('/analyze',authenticate,userController.saveData)

module.exports = router;