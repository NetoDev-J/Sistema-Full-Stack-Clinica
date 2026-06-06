import * as disponibilidadeService from '../services/disponibilidade.service.js';

export async function listarPorMedico(req, res) {
    try{
        console.log('buscando disponibilidade para:', req.params.medico_id)
        const resultado = await disponibilidadeService.listarPorMedico(req.params.medico_id);
        res.status(200).json(resultado);
    } catch(erro){
        console.log('erro disponibilidade:', erro.message)
        res.status(400).json({erro:erro.message});
    }
    
}

export async function criar(req,res) {
    try{
        const resultado = await disponibilidadeService.criar(req.body,req.usuario);
        res.status(201).json(resultado);
    }catch(erro){
        res.status(400).json({erro:erro.message});
    }
    
}

export async function deletar(req,res) {
    try{
        const {id,medico_id} = req.params;
        await disponibilidadeService.deletar(id, medico_id, req.usuario);
        res.status(204).send();
    }catch(erro){
        res.status(400).json({erro:erro.message});
    }
    
}