import { supabase } from '../database/supabase.js';

export async function criar(dados){
    const {data,error} = await supabase
    .from('paciente')
    .insert([dados])
    .select()
    .single();

    if (error) throw new Error(error.message)
    return data;
}

export async function existe(id) {
    const{data} = await supabase
    .from('paciente')
    .select('id')
    .eq('id',id)
    .single()

    return !!data;
}

export async function listar(id) {
    const {data,error} = await supabase
    .from('paciente')
    .select(`
        *,
        usuario:usuario_id(nome,email)`);
    if (error) throw new Error(error.message);
    return data;
}

export async function buscarPorId(id) {
    const{data,error} = await supabase
    .from('paciente')
    .select(`
        *,
        usuario:usuario_id(nome,email)`)
    .eq('id', id)
    .single();

    if (error) throw new Error(error.message);

    return data;

}