import { defineStore } from 'pinia'
import api from '@/services/api'

export const useDisponibilidadeStore = defineStore('disponibilidade', {
  state: () => ({
    disponibilidades: [],
    slots: [],
  }),
  actions: {
    async buscarPorMedico(medico_id) {
      const { data } = await api.get(`/disponibilidades/${medico_id}`)
      this.disponibilidades = data
    },

    async gerarSlots(medico_id, clinica_id, data) {
      const diaSemana = new Date(`${data}T12:00:00`).getDay()

      const disponibilidade = this.disponibilidades.find(
        (d) => d.dia_semana === diaSemana && d.clinica_id === clinica_id,
      )

      if (!disponibilidade) {
        this.slots = []
        return
      }

      const slots = []
      const [hInicio, mInicio] = disponibilidade.hora_inicio.split(':').map(Number)
      const [hFim, mFim] = disponibilidade.hora_fim.split(':').map(Number)
      const duracao = disponibilidade.duracao_consulta

      let atual = hInicio * 60 + mInicio

      const fim = hFim * 60 + mFim

      while (atual + duracao <= fim) {
        const inicioSlot = `${String(Math.floor(atual / 60)).padStart(2, '0')}:${String(atual % 60).padStart(2, '0')}:00`

        const fimSlot = `${String(Math.floor((atual + duracao) / 60)).padStart(2, '0')}:${String((atual + duracao) % 60).padStart(2, '0')}:00`
        slots.push({ inicio: inicioSlot, fim: fimSlot })
        atual += duracao
      }
      this.slots = slots
    },
  },

  getters: {
    diasDisponiveis: (state) => state.disponibilidades.map((d) => d.dia_semana),

    diasDisponiveisPorClinica: (state) => (clinica_id) => {
      console.log('filtrando por clinica_id:', clinica_id)
      console.log(
        'disponibilidades:',
        state.disponibilidades.map((d) => ({ clinica_id: d.clinica_id, dia: d.dia_semana })),
      )

      return state.disponibilidades
        .filter((d) => d.clinica_id === clinica_id)
        .map((d) => d.dia_semana)
    },
  },
})
