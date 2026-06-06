import { supabase } from '../database/supabase.js';

export async function verificar(medico_id,data,inicio,fim) {
    
    const inicioConsulta = `${data}T${inicio}`;
    const fimConsulta = `${data}T${fim}`;


    const {data:bloqueio, error} = await supabase
    .from('bloqueio_agenda')
    .select('*')
    .eq('medico_id',medico_id);

    if(error) throw new Error(error.message);


    return bloqueio.some(
        (b) =>
        inicioConsulta <b.data_fim && fimConsulta> b.data_inicio
    );
}

export async function criar(dados) {
  const { data, error } = await supabase
    .from('bloqueio_agenda')
    .insert([dados])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}