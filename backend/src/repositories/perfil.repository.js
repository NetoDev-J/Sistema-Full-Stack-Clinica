import { supabase } from '../database/supabase.js';

export async function buscarPorNome(nome){
    const {data ,error} = await supabase
        .from('perfil')
        .select('*')
        .eq('nome', nome)
        .single();
    
        if(error) throw new Error(error.message);

        return data;
}
