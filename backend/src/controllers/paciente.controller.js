import * as pacienteService from '../services/paciente.service.js'

export async function criar(req,res) {
    try{
        const resultado = await pacienteService.listar(req.usuario);
        res.status(200).json(resultado);
    }catch(erro){
        res.status(400).json({erro:erro.message})
    }
    
}

export async function listar(req,res) {
    try{
        const resultado = await pacienteService.listar();
        res.status(200).json(resultado);
    } catch(erro){
        res.status(400).json({erro:erro.message});
    }
    
}

export async function buscarPorID(req,res) {
    try{
        const resutlado = await pacienteService.buscarPorId(req.paramns.id);
        res.status(200).json(resutlado);
    } catch(erro){
        res.status(400).json({erro:erro.message});
    }
    
}