import * as consultaRepo from '../repositories/consulta.repository.js';
import * as disponibilidadeRepo from '../repositories/disponibilidade.repository.js';
import * as bloqueioRepo from '../repositories/bloqueio.repository.js';
import * as medicoRepo from '../repositories/medico.repository.js';
import * as pacienteRepo from '../repositories/paciente.repository.js';
import * as clinicaRepo from '../repositories/clinica.repository.js';

export async function criar({ medico_id, clinica_id, data, hora_inicio, hora_fim, paciente_id:paciente_id_body }, usuario) {
  const paciente_id = usuario.perfil === 'paciente' 
  ? usuario.paciente_id
  :paciente_id_body
  if (!paciente_id) throw new Error('paciente não identificado no token');

  console.log('1. validando entidades')
  const [medicoExiste, pacienteExiste, clinicaExiste] = await Promise.all([
    medicoRepo.existe(medico_id),
    pacienteRepo.existe(paciente_id),
    clinicaRepo.existe(clinica_id),
  ]);
  if (!medicoExiste)   throw new Error('Médico não encontrado');
  if (!pacienteExiste) throw new Error('Paciente não encontrado');
  if (!clinicaExiste)  throw new Error('Clínica não encontrada');

  console.log('2. verificando disponibilidade')
  const disponivelNoDia = await disponibilidadeRepo.verificar(medico_id, clinica_id, data, hora_inicio, hora_fim);
  if (!disponivelNoDia) throw new Error('Médico não possui disponibilidade nesse horário');

  console.log('3. verificando bloqueio')
  const temBloqueio = await bloqueioRepo.verificar(medico_id, data, hora_inicio, hora_fim);
  if (temBloqueio) throw new Error('médico está com a agenda bloqueada nesse horário');

  console.log('4. verificando conflito')
  const temConflito = await consultaRepo.buscarPorConflito(medico_id, data, hora_inicio, hora_fim);
  if (temConflito) throw new Error('Já há consulta agendada para esse horário');

  console.log('5. criando consulta')
  return consultaRepo.criar({ paciente_id, medico_id, clinica_id, data, hora_inicio, hora_fim });
}

export async function listar(filtros={}, usuario){
    if (usuario.perfil==='medico'){
        filtros.medico_id = usuario.medico_id;
    } else if (usuario.perfil === 'paciente'){
        filtros.paciente_id = usuario.paciente_id;
    }

    return consultaRepo.listar(filtros);
}

export async function cancelar(id, usuario){
    const consulta = await consultaRepo.buscarPorId(id);
    if(!consulta) throw new Error('consulta não encontrada');

    if(consulta.status === 'cancelada') {
        throw new Error('consulta já cancelada');
    }

    if(usuario.perfil === 'medico' && consulta.medico !== usuario.medico_id){
        throw new Error('você não tem permissão para cancelar essa consulta');
    }

    if(usuario.perfil ==='paciente' && consulta.paciente_id !== usuario.paciente_id){
        throw new Error('você não tem permissão de cancelar essa consulta.');
    }

    return consultaRepo.atualizarStatus(id,'cancelada');

}