import { Router } from "express";
import * as consultaController from '../controllers/consulta.controller.js';
import { authMiddleware } from "../middlewares/Auth.middleware.js";
import { rbac } from "../middlewares/Rbac.middleware.js";

const router = Router();

router.post('/', authMiddleware, rbac('paciente','admin'), consultaController.criar);

router.get('/', authMiddleware,rbac('admin','medico','paciente'), consultaController.listar);

router.patch('/:id/cancelar', authMiddleware, rbac('admin', 'medico', 'paciente'), consultaController.cancelar);

export default router;