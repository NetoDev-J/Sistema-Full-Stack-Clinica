import * as bloqueioService from '../services/bloqueio.service.js';

export async function criar(req,res) {
    try{
        const resultado = await bloqueioService.criar(req.body,req.usuario);
        res.status(201).json(resultado);
    }catch(erro){
        res.status(400).json({erro:erro.message});
    }
    
}