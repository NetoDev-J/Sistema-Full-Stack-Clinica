<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Entrar</h1>

      <div v-if="erro" class="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">
        {{ erro }}
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="seu@email.com"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
        <input
          v-model="senha"
          type="password"
          placeholder="••••••••"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="button"
        @click="handleLogin"
        class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Entrar
      </button>

      <p class="text-center text-sm text-gray-500 mt-4">
        Não tem conta?
        <RouterLink to="/registro" class="text-blue-600 hover:underline">Cadastre-se</RouterLink>
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

const email = ref('')
const senha = ref('')
const erro = ref('')

async function handleLogin() {
  console.log('clicou')
  erro.value = ''

  try {
    await authStore.login(email.value, senha.value)
    console.log('perfil:', authStore.perfil)
    console.log('estaLogado:', authStore.estaLogado)
    router.push('/dashboard')
  } catch (e) {
    erro.value = e.response?.data?.erro || 'Erro ao fazer login.'
  }
}
</script>
