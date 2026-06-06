<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md space-y-5">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-800">Criar Conta</h1>
        <p class="text-sm text-gray-400 mt-1">Preencha os dados para se cadastrar</p>
      </div>

      <AlertMessage :message="erro" type="error" />

      <BaseInput v-model="form.nome" label="Nome" placeholder="Seu nome completo" />
      <BaseInput v-model="form.email" label="Email" type="email" placeholder="seu@email.com" />
      <BaseInput v-model="form.senha" label="Senha" type="password" placeholder="••••••••" />

      <BaseSelect v-model="form.perfil" label="Perfil" placeholder="Selecione...">
        <option value="paciente">Paciente</option>
        <option value="medico">Médico</option>
      </BaseSelect>

      <BaseInput v-if="form.perfil === 'paciente'" v-model="form.cpf" label="CPF" placeholder="000.000.000-00" />
      <BaseInput v-if="form.perfil === 'medico'" v-model="form.crm" label="CRM" placeholder="CRM12345" />

      <BaseButton size="lg" :loading="carregando" @click="handleRegistro">
        Criar Conta
      </BaseButton>

      <p class="text-center text-sm text-gray-400">
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
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import AlertMessage from '@/components/common/AlertMessage.vue'

const router = useRouter()
const authStore = useAuthStore()
const erro = ref('')
const carregando = ref(false)
const form = ref({ nome: '', email: '', senha: '', perfil: '', cpf: '', crm: '' })

async function handleRegistro() {
  erro.value = ''
  carregando.value = true
  try {
    await authStore.registro(form.value)
    await authStore.login(form.value.email, form.value.senha)
    router.push('/dashboard')
  } catch (e) {
    erro.value = e.response?.data?.erro || 'Erro ao criar conta.'
  } finally {
    carregando.value = false
  }
}
</script>