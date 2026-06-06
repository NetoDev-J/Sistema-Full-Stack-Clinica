import * as medicoRepo from '../repositories/medico.repository.js';

export async function listar(){
    return medicoRepo.listar();
}

export async function buscarPorID(id) {
    const medico = await medicoRepo.buscarPorId(id);
    if (!medico) throw new Error('Médico não encontrado');
    return medico;
    
}