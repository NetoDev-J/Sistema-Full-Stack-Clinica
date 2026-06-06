<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow px-6 py-4 flex justify-between items-center">
      <RouterLink to="/dashboard" class="text-blue-600 font-bold text-xl">Clínica</RouterLink>
      <button @click="authStore.logout" class="text-sm text-red-500 hover:underline">Sair</button>
    </nav>

    <div class="max-w-4xl mx-auto p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Clínicas</h2>
        <button
          @click="mostrarForm = !mostrarForm"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
        >
          + Nova Clínica
        </button>
      </div>

      <!-- Formulário de criação -->
      <div v-if="mostrarForm" class="bg-white rounded-xl shadow-sm p-6 mb-6 space-y-4">
        <h3 class="font-semibold text-gray-700">Nova Clínica</h3>

        <div v-if="erro" class="bg-red-100 text-red-600 text-sm p-3 rounded-lg">{{ erro }}</div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input
            v-model="form.nome"
            type="text"
            placeholder="Nome da clínica"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
          <input
            v-model="form.endereco"
            type="text"
            placeholder="Endereço completo"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          @click="handleCriar"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Salvar
        </button>
      </div>

      <!-- Lista de clínicas -->
      <div v-if="carregando" class="text-center text-gray-500 py-10">Carregando...</div>

      <div v-else-if="clinicaStore.clinicas.length === 0" class="text-center text-gray-500 py-10">
        Nenhuma clínica cadastrada.
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="clinica in clinicaStore.clinicas"
          :key="clinica.id"
          class="bg-white rounded-xl shadow-sm p-5"
        >
          <p class="font-semibold text-gray-800">{{ clinica.nome }}</p>
          <p class="text-sm text-gray-500">{{ clinica.endereco }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useClinicaStore } from '@/stores/clinica.store'
import { useAuthStore } from '@/stores/auth.store'

const clinicaStore = useClinicaStore()
const authStore = useAuthStore()
const carregando = ref(true)
const mostrarForm = ref(false)
const erro = ref('')

const form = ref({ nome: '', endereco: '' })

onMounted(async () => {
  await clinicaStore.listar()
  carregando.value = false
})

async function handleCriar() {
  erro.value = ''
  try {
    await clinicaStore.criar(form.value)
    form.value = { nome: '', endereco: '' }
    mostrarForm.value = false
  } catch (e) {
    erro.value = e.response?.data?.erro || 'Erro ao criar clínica.'
  }
}
</script>
