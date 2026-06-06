import { supabase } from '../database/supabase.js';

export async function listar(){
    const {data,error} = await supabase
    .from('especialidade')
    .select('*');

    if (error) throw new Error(error.message);

    return data;
}