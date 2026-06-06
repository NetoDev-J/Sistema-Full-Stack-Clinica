import { supabase } from '../database/supabase.js';

export async function criar(dados){
    const {data, error} = await supabase
    .from('medico')
    .insert([dados])
    .select()
    .single()

    if(error) throw new Error(error.message)

    return data;
}

export async function existe(id) {
    const{data} = await supabase
    .from('medico')
    .select('id')
    .eq('id',id)
    .single()

    return !!data;
    
}

export async function listar() {
  const { data, error } = await supabase
    .from('medico')
    .select(`
      *,
      usuario:usuario_id(nome, email),
      especialidade:especialidade_id(nome)
    `);
  if (error) throw new Error(error.message);
  return data;
}
 
export async function buscarPorId(id) {
  const { data, error } = await supabase
    .from('medico')
    .select(`
      *,
      usuario:usuario_id(nome, email),
      especialidade:especialidade_id(nome)
    `)
    .eq('id', id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}
