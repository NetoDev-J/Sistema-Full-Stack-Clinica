import { supabase } from '../database/supabase.js';

export async function criar(dados) {
    const {data, error} = await supabase 
    .from('usuario')
    .insert([dados])
    .select()
    .single();

    if (error) throw new Error(error.message);

    return data;
}

export async function buscarPorEmail(email) {
    const {data,error} = await supabase
    .from('usuario')
    .select('*,perfil:perfil_id(nome),medico(id),paciente(id)')
    .eq('email',email)
    .single()

    return data;
    
}