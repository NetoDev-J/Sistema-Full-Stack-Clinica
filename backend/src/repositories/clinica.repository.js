import { supabase } from '../database/supabase.js';

export async function existe(id){
    const{data} = await supabase
    .from('clinica')
    .select('id')
    .eq('id',id)
    .single()
    return !!data;
}

export async function listar() {
    const {data,error}= await supabase
    .from('clinica')
    .select('*');
    if(error) throw new Error(error.message);
    return data;
    
}
export async function criar(dados) {
    const {data,error} = await supabase
    .from('clinica')
    .insert([dados])
    .select()
    .single();
    if (error) throw new Error(error.message);
    return data;
}

export async function buscarPorId(id) {
    const {data,error}= await supabase
    .from('clinica')
    .select('*')
    .eq('id',id)
    .single();
    if(error) throw new Error(error.message);

    return data; 
}

