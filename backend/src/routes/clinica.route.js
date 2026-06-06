import { Router } from "express";
import * as clinicaController from '../controllers/clinica.controller.js';
import { authMiddleware } from "../middlewares/Auth.middleware.js";
import { rbac } from "../middlewares/Rbac.middleware.js";

const router = Router();

router.get('/', authMiddleware,rbac('admin', 'medico', 'paciente'), clinicaController.listar);
router.get('/:id', authMiddleware,rbac('admin','medico','paciente'),clinicaController.buscarPorID);

router.post('/', authMiddleware, rbac('admin'), clinicaController.criar);

export default router;