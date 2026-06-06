import * as clinicaRepo from '../repositories/clinica.repository.js';

export async function listar() {
  return clinicaRepo.listar();
}

export async function criar({ nome, endereco }, usuario) {
  if (usuario.perfil !== 'admin') {
    throw new Error('Apenas administradores podem cadastrar clínicas.');
  }
  return clinicaRepo.criar({ nome, endereco });
}

export async function buscarPorId(id) {
  const clinica = await clinicaRepo.buscarPorId(id);
  if (!clinica) throw new Error('Clínica não encontrada.');
  return clinica;
}