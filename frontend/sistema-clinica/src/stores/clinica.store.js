import { defineStore } from 'pinia'
import api from '@/services/api'

export const useClinicaStore = defineStore('clinica', {
  state: () => ({
    clinicas: [],
  }),
  actions: {
    async listar() {
      const { data } = await api.get('/clinicas')
      this.clinicas = data
    },

    async criar(dados) {
      const { data } = await api.post('/clinicas', dados)
      this.clinicas.push(data)
    },
  },
})
