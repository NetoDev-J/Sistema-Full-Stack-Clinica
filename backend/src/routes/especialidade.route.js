import { Router } from "express";
import * as especialidadeController from '../controllers/especialidade.controller.js';
import { authMiddleware } from "../middlewares/Auth.middleware.js";
import { rbac } from "../middlewares/Rbac.middleware.js";

const router = Router();

router.get('/', authMiddleware, rbac('admin', 'medico','paciente'), especialidadeController.listar);

export default router;