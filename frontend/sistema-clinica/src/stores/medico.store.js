import { defineStore } from 'pinia'
import api from '@/services/api'

export const useMedicoStore = defineStore('medico', {
  state: () => ({
    medicos: [],
  }),
  actions: {
    async listar() {
      const { data } = await api.get('/medicos')
      this.medicos = data
    },

    async buscarPorId(id) {
      const { data } = await api.get(`/medicos/${id}`)
      return data
    },
  },
})
