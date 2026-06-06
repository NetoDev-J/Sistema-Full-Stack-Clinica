import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    usuario: null,
    perfil: null,
  }),

  getters: {
    estaLogado: (state) => !!state.token,
    ehAdmin: (state) => state.perfil === 'admin',
    ehMedico: (state) => state.perfil === 'medico',
    ehPaciente: (state) => state.perfil === 'paciente',
  },

  actions: {
    async login(email, senha) {
      const { data } = await api.post('/auth/login', { email, senha })
      this.token = data.token
      this.perfil = data.perfil
      localStorage.setItem('token', data.token)
    },

    logout() {
      this.token = null
      this.perfil = null
      localStorage.removeItem('token')
      window.location.href = '/login'
    },

    async registro(dados) {
      const { data } = await api.post('/auth/registrar', dados)
      return data
    },

    init() {
      const token = localStorage.getItem('token')
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]))
        this.token = token
        this.perfil = payload.perfil
        this.usuario = {
          id: payload.id,
          nome: payload.nome,
          email: payload.email,
          medico_id: payload.medico_id,
          paciente_id: payload.paciente_id,
        }
      }
    },
  },
})
