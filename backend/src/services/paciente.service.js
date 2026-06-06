import * as pacienteRepo from '../repositories/paciente.repository.js'

export async function buscarPorId(id,usuario){
    if(usuario.perfil === 'paciente' && usuario.paciente_id !== id) {
        throw new Error('Você não possui permissão para ver esse paciente');
    }

    const paciente = await pacienteRepo.buscarPorId(id);
    if (!paciente) throw new Error('Paciente não encontrado');
    return paciente;
}

export async function listar(usuario) {
    if(usuario.perfil !== 'admin') {
        throw new Error('Apenas administradores podem listar pacientes.');
    }
    return pacienteRepo.listar();
}