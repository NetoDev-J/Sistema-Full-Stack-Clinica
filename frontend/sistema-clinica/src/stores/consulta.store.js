import { defineStore } from 'pinia'
import api from '@/services/api'

export const useConsultaStore = defineStore('consulta', {
  state: () => ({
    consultas: [],
  }),

  actions: {
    async listar() {
      const { data } = await api.get('/consultas')
      this.consultas = data
    },

    async criar(dados) {
      const { data } = await api.post('/consultas', dados)
      this.consultas.push(data)
    },

    async cancelar(id) {
      const { data } = await api.patch(`/consultas/${id}/cancelar`)
      const index = this.consultas.findIndex((c) => c.id === id)
      if (index !== -1) this.consultas[index].status = 'cancelada'
    },
  },
})
