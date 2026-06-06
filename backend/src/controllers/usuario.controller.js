import * as usuarioService from '../services/usuario.service.js';

export async function registrar(req,res) {
    try{
        const resultado = await usuarioService.registrar(req.body);
        res.status(201).json(resultado);
    } catch(erro){
        res.status(400).json({erro: erro.message});
    }
    
}

export async function login(req, res){
    try{
        const resultado = await usuarioService.login(req.body);
        res.status(200).json(resultado);
    }catch (erro){
        res.status(401).json({erro:erro.message});
    }
}