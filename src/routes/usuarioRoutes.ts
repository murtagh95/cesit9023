import express from 'express';
import UserController from '../controllers/userController';
const router = express.Router();

const controller = new UserController();

router.post('/registrar', controller.postRegistrar);
router.post('/login', controller.postLogin);
router.post('/logout', controller.postLogout);
router.get('/', controller.getUsers);
// router.get('/dev/crear-set-pruebas', controller.crearSetProuebas);

export default router;
