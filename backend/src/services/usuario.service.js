import bcrypt from 'bcrypt';
import * as usuarioRepo from '../repositories/usuario.repository.js';
import * as perfilRepo from '../repositories/perfil.repository.js';
import * as medicoRepo from '../repositories/medico.repository.js';
import * as pacienteRepo from '../repositories/paciente.repository.js';
import { gerarToken } from '../utils/jwt.js';


export async function registrar({nome,email,senha,perfil:nomePerfil,crm,especialidade_id,cpf,data_nascimento,telefone}) {

    const perfil = await perfilRepo.buscarPorNome(nomePerfil);



    if(!perfil) throw new Error('Perfil inválido. Use: admin , médico ou paciente')

        const senhaHash = await bcrypt.hash(senha, 10);

    
        const usuario = await usuarioRepo.criar({
            nome,
            email,
            senha:senhaHash,
            perfil_id:perfil.id,
        });


        if(nomePerfil === 'medico') {
            if (!crm || !especialidade_id){
            throw new Error('CRM e especialidade_id são obrigatórios para médico');
            }

            await medicoRepo.criar({ usuario_id: usuario.id, crm, especialidade_id});
        }

        if (nomePerfil === 'paciente'){
            if(!cpf) throw new Error('cpf é obrigatório para paciente');

            await pacienteRepo.criar({usuario_id: usuario.id, cpf, data_nascimento, telefone});
        }

        return{mensagem: 'Usuário criado com sucesso.', id:usuario.id, perfil: nomePerfil};
}

export async function login({email,senha}){
    const usuario = await usuarioRepo.buscarPorEmail(email);

    console.log('usuario completo:', JSON.stringify(usuario, null, 2))

    console.log('1. usuario encontrado:', usuario)

    if (!usuario) throw new Error('Email ou senha incorretos');

    const senhaValida = await bcrypt.compare(senha, usuario.senha); 

      console.log('2. senha valida:', senhaValida)


    if(!senhaValida) throw new Error('Email ou senha incorretos');

    const nomePerfil= usuario.perfil?.nome;

    const payload  ={
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: nomePerfil,
    };   


    if (nomePerfil === 'medico' && usuario.medico?.id) {
    payload.medico_id = usuario.medico.id;
    }

    if (nomePerfil === 'paciente' && usuario.paciente?.id) {
    payload.paciente_id = usuario.paciente.id;
    }

    const token = gerarToken(payload);
    return{token, perfil:nomePerfil};
}
