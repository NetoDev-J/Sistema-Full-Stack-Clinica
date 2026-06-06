import { Router } from "express";
import * as disponibilidadeController from '../controllers/disponibilidade.controller.js';
import { authMiddleware } from "../middlewares/Auth.middleware.js";
import { rbac } from "../middlewares/Rbac.middleware.js";

const router = Router();

router.get('/:medico_id', authMiddleware, rbac('admin','medico', 'paciente'), disponibilidadeController.listarPorMedico);

router.post('/', authMiddleware, rbac('medico','admin'), disponibilidadeController.criar);

router.delete('/:medico_id/:id', authMiddleware, rbac('admin','medico'),disponibilidadeController.deletar);

export default router;