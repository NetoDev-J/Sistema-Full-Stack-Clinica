import * as especialidadeService from '../services/especialidade.service.js';

export async function listar(req,res) {
    try{
        const resultado = await especialidadeService.listar();
        res.status(200).json(resultado);
    }catch(erro){
        console.log('erro especialidade:', erro.message)
        res.status(400).json({erro:erro.message});
    }
    
}