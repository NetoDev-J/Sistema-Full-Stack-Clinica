import * as clinicaRepo from '../repositories/clinica.repository.js';

// ─── Listar ───────────────────────────────────────────────────────────────────
// Qualquer perfil autenticado pode listar clínicas (necessário ao agendar consulta).
export async function listar() {
  return clinicaRepo.listar();
}

// ─── Criar ────────────────────────────────────────────────────────────────────
// Apenas admin pode cadastrar clínicas.
export async function criar({ nome, endereco }, usuario) {
  if (usuario.perfil !== 'admin') {
    throw new Error('Apenas administradores podem cadastrar clínicas.');
  }
  return clinicaRepo.criar({ nome, endereco });
}

// ─── Buscar por ID ────────────────────────────────────────────────────────────
// Qualquer perfil autenticado pode buscar uma clínica pelo ID.
export async function buscarPorId(id) {
  const clinica = await clinicaRepo.buscarPorId(id);
  if (!clinica) throw new Error('Clínica não encontrada.');
  return clinica;
}