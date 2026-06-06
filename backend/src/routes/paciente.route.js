import { Router } from "express";
import * as pacienteControler from '../controllers/paciente.controller.js';
import { authMiddleware } from "../middlewares/Auth.middleware.js";
import { rbac } from "../middlewares/Rbac.middleware.js";

const router = Router();

router.get('/', authMiddleware, rbac('admin'),pacienteControler.listar);

router.get('/:id', authMiddleware, rbac('admin', 'paciente'), pacienteControler.buscarPorID);

export default router;