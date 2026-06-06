import { Router } from 'express';
import authRoute from './auth.route.js';
import consultaRoute from './consulta.route.js';
import medicoRoute from './medico.route.js';
import pacienteRoute from './paciente.route.js';
import disponibilidadeRoute from './disponibilidade.route.js';
import bloqueioRoute from './bloqueio.route.js';
import clinicaRoute from './clinica.route.js';
import especialidadeRoute from './especialidade.route.js';

const router = Router();

router.use('/auth', authRoute);
router.use('/consultas', consultaRoute);
router.use('/medicos', medicoRoute);
router.use('/pacientes', pacienteRoute);
router.use('/disponibilidades', disponibilidadeRoute);
router.use('/bloqueios', bloqueioRoute);
router.use('/clinicas', clinicaRoute);
router.use('/especialidades', especialidadeRoute);

export default router;