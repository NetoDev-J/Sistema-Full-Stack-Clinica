import { Router } from "express";
import * as medicoController from '../controllers/medico.controller.js';
import { authMiddleware } from "../middlewares/Auth.middleware.js";
import { rbac } from "../middlewares/Rbac.middleware.js";

const router = Router();

router.get('/', authMiddleware,rbac('admin','medico','paciente'), medicoController.listar);
router.get('/:id', authMiddleware, rbac('admin','medico','paciente'), medicoController.buscarPorID);

export default router;