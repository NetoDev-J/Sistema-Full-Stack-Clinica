import { Router } from 'express';
import * as authController from '../controllers/usuario.controller.js';

const router = Router();

router.post('/registrar', authController.registrar);
router.post('/login', authController.login);

export default router;