<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Minhas Consultas</h2>

      <div v-if="carregando" class="text-center text-gray-400 py-16">Carregando...</div>

      <div v-else-if="consultaStore.consultas.length === 0"
        class="text-center text-gray-400 py-16 bg-white rounded-xl shadow-sm">
        Nenhuma consulta encontrada.
      </div>

      <div v-else class="space-y-3">
        <CardConsulta
          v-for="consulta in consultaStore.consultas"
          :key="consulta.id"
          :consulta="consulta"
          @cancelar="cancelar"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useConsultaStore } from '@/stores/consulta.store'
import Navbar from '@/components/common/Navbar.vue'
import CardConsulta from '@/components/consulta/CardConsulta.vue'

const consultaStore = useConsultaStore()
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