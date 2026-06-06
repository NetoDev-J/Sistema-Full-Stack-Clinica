<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow px-6 py-4 flex justify-between items-center">
      <RouterLink to="/dashboard" class="text-blue-600 font-bold text-xl">Clínica</RouterLink>
      <button @click="authStore.logout" class="text-sm text-red-500 hover:underline">Sair</button>
    </nav>

    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Minhas Consultas</h2>

      <div v-if="carregando" class="text-center text-gray-500 py-10">Carregando...</div>

      <div v-else-if="consultaStore.consultas.length === 0" class="text-center text-gray-500 py-10">
        Nenhuma consulta encontrada.
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="consulta in consultaStore.consultas"
          :key="consulta.id"
          class="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center"
        >
          <div>
            <p class="font-semibold text-gray-800">{{ consulta.medico?.usuario?.nome }}</p>
            <p class="text-sm text-blue-600">{{ consulta.medico?.especialidade?.nome }}</p>
            <p class="text-sm text-gray-500">
              {{ consulta.data }} às {{ consulta.hora_inicio }} — {{ consulta.clinica?.nome }}
            </p>
            <span
              :class="{
                'bg-green-100 text-green-700': consulta.status === 'agendada',
                'bg-red-100 text-red-700': consulta.status === 'cancelada',
              }"
              class="text-xs font-medium px-2 py-1 rounded-full"
            >
              {{ consulta.status }}
            </span>
          </div>

          <button
            v-if="consulta.status === 'agendada'"
            @click="cancelar(consulta.id)"
            class="text-sm text-red-500 hover:underline"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useConsultaStore } from '@/stores/consulta.store'
import { useAuthStore } from '@/stores/auth.store'

const consultaStore = useConsultaStore()
const authStore = useAuthStore()
const carregando = ref(true)

onMounted(async () => {
  await consultaStore.listar()
  carregando.value = false
})

async function cancelar(id) {
  if (confirm('Deseja cancelar esta consulta?')) {
    await consultaStore.cancelar(id)
  }
}
</script>
