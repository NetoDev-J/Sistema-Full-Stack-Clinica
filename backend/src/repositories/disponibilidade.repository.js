import { supabase } from '../database/supabase.js';

export async function verificar(medico_id,clinica_id,data,inicio,fim) {
    
    const dia_semana = new Date(`${data}T12:00:00`).getDay();

    console.log('data recebida:', data)
    console.log('dia da semana calculado:', dia_semana)
    console.log('inicio:', inicio, 'fim:', fim)

    const {data:horarios, error}= await supabase
    .from('disponibilidade_medico')
    .select('*')
    .eq('medico_id',medico_id)
    .eq('clinica_id', clinica_id)
    .eq('dia_semana',dia_semana)
    
    if(error) throw new Error(error.message);
    if(!horarios || horarios.length ===0) return false;

    return horarios.some(h =>{
      console.log('comparando:', inicio, '>=', h.hora_inicio, '&&', fim, '<=', h.hora_fim)

      return inicio >= h.hora_inicio && fim <=h.hora_fim
    }
        
    );

}

export async function listarPorMedico(medico_id) {
  const { data, error } = await supabase
    .from('disponibilidade_medico')
    .select('*, clinica:clinica_id(id, nome)')
    .eq('medico_id', medico_id)
    .order('dia_semana');
  if (error) throw new Error(error.message);
  return data;
}
 
export async function criar(dados) {
  const { data, error } = await supabase
    .from('disponibilidade_medico')
    .insert([dados])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}
 
export async function deletar(id) {
  const { error } = await supabase
    .from('disponibilidade_medico')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
}
