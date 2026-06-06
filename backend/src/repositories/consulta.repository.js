import { supabase } from '../database/supabase.js'

export async function criar(dados) {
  const { data, error } = await supabase
    .from('consulta')
    .insert([dados])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function buscarPorConflito(medico_id, data, inicio, fim) {
  const { data: conflito, error } = await supabase 
    .from('consulta')
    .select('*')
    .eq('medico_id', medico_id)
    .eq('data', data)
    .lt('hora_inicio', fim)
    .gt('hora_fim', inicio);
  if (error) throw new Error(error.message);
  return conflito.length > 0;
}

export async function listar(filtros = {}) {
  let query = supabase.from('consulta').select(`
    *,
    paciente:paciente_id(id, usuario:usuario_id(nome)),
    medico:medico_id(id, crm, usuario:usuario_id(nome),
    especialidade:especialidade_id(nome)),
    clinica:clinica_id(id, nome, endereco)
  `);
  if (filtros.medico_id)   query = query.eq('medico_id', filtros.medico_id);
  if (filtros.paciente_id) query = query.eq('paciente_id', filtros.paciente_id);
  if (filtros.data)        query = query.eq('data', filtros.data);
  if (filtros.status)      query = query.eq('status', filtros.status);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function buscarPorId(id) {
  const { data, error } = await supabase
    .from('consulta') 
    .select(`
      *,
      paciente:paciente_id(id, usuario:usuario_id(nome)),
      medico:medico_id(id, crm, usuario:usuario_id(nome)), 
      clinica:clinica_id(id, nome)
    `) 
    .eq('id', id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function atualizarStatus(id, status) {
  const { data, error } = await supabase
    .from('consulta')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}