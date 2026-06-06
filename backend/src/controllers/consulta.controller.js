import * as consultaService from '../services/consulta.service.js';

export async function criar(req,res) {
    try{
        const resultado = await consultaService.criar(req.body, req.usuario);
        res.status(201).json(resultado);
    } catch (erro){
        console.log('erro ao criar consulta: ',erro.message)
        res.status(400).json({erro:erro.message});
    }
    
}

export async function listar(req, res){
    try{
        const resultado = await consultaService.listar(req.query,req.usuario);
        res.status(200).json(resultado)
    } catch (erro){
        res.status(400).json({erro:erro.message});
    }
    
}

export async function cancelar(req,res) {
    try{
        const resultado = await consultaService.cancelar(req.params.id, req.usuario);
        res.status(200).json(resultado);
    }catch(erro){
        res.status(400).json({erro:erro.message});
    }
    
}