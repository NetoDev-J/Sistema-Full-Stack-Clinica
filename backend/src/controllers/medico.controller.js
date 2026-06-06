import * as medicoService from '../services/medico.service.js';

export async function listar(req,res) {
    try{
        const resultado = await medicoService.listar();
        res.status(200).json(resultado);
    } catch(erro){
        req.status(400).json({erro:erro.message});
    }
    
}

export async function buscarPorID(req,res) {
    try{
        const resultado = await medicoService.buscarPorID(req.params.id);
        res.status(200).json(resultado);
    }catch(erro){
        res.status(400).json({erro:erro.message});
    }
    
}