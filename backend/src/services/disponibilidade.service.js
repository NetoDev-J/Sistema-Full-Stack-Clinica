import * as disponibilidadeRepo from '../repositories/disponibilidade.repository.js';
import * as medicoRepo from '../repositories/medico.repository.js';

export async function listarPorMedico(medico_id) {
    const existe = await medicoRepo.existe(medico_id);
    if(!existe) throw new Error('Médico nao encontrado');
    return disponibilidadeRepo.listarPorMedico(medico_id);
}

export async function criar(dados, usuario) {
    if(usuario.perfil === 'medico' && dados.medico_id !== usuario.medico_id) {
        throw new Error('Você só pode gerenciar sua própria disponibilidade');
    }
    return disponibilidadeRepo.criar(dados);
}

export async function deletar(id, medico_id, usuario) {
    if (usuario.perfil === 'medico' && medico_id!== usuario.medico_id) {
        throw new Error('Você só pode remover sua própria disponibilidade');
    }
    return disponibilidadeRepo.deletar(id);
}  