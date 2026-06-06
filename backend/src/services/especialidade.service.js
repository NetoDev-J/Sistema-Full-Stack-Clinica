import * as especialidadeRepo from '../repositories/especialidade.repository.js';

export async function listar() {
    return especialidadeRepo.listar();
    
}