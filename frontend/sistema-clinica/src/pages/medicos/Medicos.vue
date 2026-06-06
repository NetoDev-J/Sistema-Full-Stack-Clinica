<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow px-6 py-4 flex justify-between items-center">
      <RouterLink to="/dashboard" class="text-blue-600 font-bold text-xl">Clínica</RouterLink>
      <button @click="authStore.logout" class="text-sm text-red-500 hover:underline">Sair</button>
    </nav>

    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Médicos</h2>

      <div v-if="carregando" class="text-center text-gray-500 py-10">Carregando...</div>

      <div v-else-if="medicoStore.medicos.length === 0" class="text-center text-gray-500 py-10">
        Nenhum médico cadastrado.
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="medico in medicoStore.medicos"
          :key="medico.id"
          class="bg-white rounded-xl shadow-sm p-5"
        >
          <p class="font-semibold text-gray-800">Dr(a). {{ medico.usuario?.nome }}</p>
          <p class="text-sm text-gray-500">{{ medico.especialidade?.nome }}</p>
          <p class="text-sm text-gray-400">CRM: {{ medico.crm }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMedicoStore } from '@/stores/medico.store'
import { useAuthStore } from '@/stores/auth.store'

const medicoStore = useMedicoStore()
const authStore = useAuthStore()
const carregando = ref(true)

onMounted(async () => {
  await medicoStore.listar()
  carregando.value = false
})
</script>
