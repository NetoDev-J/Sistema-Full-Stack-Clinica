<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Criar Conta</h1>

      <div v-if="erro" class="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">
        {{ erro }}
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input
          v-model="form.nome"
          type="text"
          placeholder="Seu nome completo"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="seu@email.com"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
        <input
          v-model="form.senha"
          type="password"
          placeholder="••••••••"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Perfil</label>
        <select
          v-model="form.perfil"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione...</option>
          <option value="paciente">Paciente</option>
          <option value="medico">Médico</option>
        </select>
      </div>

      <!-- Campos extras para paciente -->
      <div v-if="form.perfil === 'paciente'" class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">CPF</label>
        <input
          v-model="form.cpf"
          type="text"
          placeholder="000.000.000-00"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Campos extras para médico -->
      <div v-if="form.perfil === 'medico'" class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">CRM</label>
        <input
          v-model="form.crm"
          type="text"
          placeholder="CRM12345"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        @click="handleRegistro"
        class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-2"
      >
        Criar Conta
      </button>

      <p class="text-center text-sm text-gray-500 mt-4">
        Já tem conta?
        <RouterLink to="/login" class="text-blue-600 hover:underline">Entrar</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const erro = ref('')
const form = ref({
  nome: '',
  email: '',
  senha: '',
  perfil: '',
  cpf: '',
  crm: '',
})

async function handleRegistro() {
  erro.value = ''
  try {
    await authStore.registro(form.value)
    await authStore.login(form.value.email, form.value.senha)
    router.push('/dashboard')
  } catch (e) {
    erro.value = e.response?.data?.erro || 'Erro ao criar conta.'
  }
}
</script>
