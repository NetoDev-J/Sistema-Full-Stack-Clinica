import * as bloqueioRepo from '../repositories/bloqueio.repository.js'
import * as medicoRepo from '../repositories/medico.repository.js'

export async function criar({medico_id, data_inicio, data_fim, motivo}, usuario){
    if(usaario.perfil !== 'admin'){
        throw new Error('apenas administradores podem bloquear agenda.');
    }


    const existe = await medicoRepo.existe(medico_id);
    if(!existe) throw new Error('Médico nao enconrtado');

    if (new Date(data_inicio) >= new Date(data_fim)){
    throw new Error('A data de inicio deve ser anterior à data de fim');
    }
    return bloqueioRepo.criar({medico_id, data_inicio, data_fim, motivo});
}