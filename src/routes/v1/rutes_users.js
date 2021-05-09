const { Router } = require('express');

const router = Router();

const { isAuth, isAdmin } = require('../../middlewars/autentifica');
const userControler = require('../../controlers/v1/control_users');

router.post('/login', userControler.loginToken);
router.post('/create', userControler.createUser); 
router.get('/get-all', userControler.getUsers);
router.put('/update', isAuth, userControler.updateUserLog);// modifica su propia cuenta
router.delete('/delete/:id', isAuth, isAdmin, userControler.deleteUser);// elimina cualquier cuenta
module.exports = router;
