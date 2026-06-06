import { Router } from "express";
import * as bloqueioController from '../controllers/bloqueio.controller.js';
import { authMiddleware } from "../middlewares/Auth.middleware.js";
import { rbac } from "../middlewares/Rbac.middleware.js";

const router = Router();

router.post('/', authMiddleware, rbac('admin'), bloqueioController.criar);

export default router;