import { defineStore } from "pinia";
import api from "@/services/api";

export const useEspecialidadeStore = defineStore(
    'especialidade', {
        state:() => ({
            especialidades: []
        }),

        actions:{
            async listar(){
                const {data}= await api.get('/especialidades')
                this.especialidades = data
            }
        }
    }
)