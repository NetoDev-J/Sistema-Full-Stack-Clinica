import * as clinicaService from '../services/clinica.service.js';

export async function listar(req,res) {
    try{
        const resultado = await clinicaService.listar();
        res.status(200).json(resultado);
    } catch(erro){
        res.status(400).json({erro:erro.message});
    }
}

export async function criar (req, res) {
    try{
        const resultado = await clinicaService.criar(req.body, req.usuario);
        res.status(201).json(resultado);
    } catch(erro){
        res.status(400).json({erro:erro.message});
    }
    
}

export async function buscarPorID(req, res) {
    try{
        const resultado = await clinicaService.buscarPorId(req.params.id);
        res.status(200).json(resultado);
    } catch(erro){
        res.status(400).json({erro:erro.message});
    }
    
}