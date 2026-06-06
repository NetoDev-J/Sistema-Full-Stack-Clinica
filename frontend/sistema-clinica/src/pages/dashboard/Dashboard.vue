<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-4xl mx-auto p-6">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-800">
          Olá, {{ authStore.usuario?.nome }} 
        </h2>
        <p class="text-sm text-gray-400 mt-1 capitalize">{{ authStore.perfil }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RouterLink
          v-if="authStore.ehPaciente || authStore.ehAdmin"
          to="/agendar"
          class="bg-blue-600 text-white rounded-xl p-6 hover:bg-blue-700 transition shadow-sm"
        >
          <p class="text-lg font-semibold">Agendar Consulta</p>
          <p class="text-sm mt-1 opacity-75">Marque uma nova consulta</p>
        </RouterLink>

        <RouterLink
          to="/consultas"
          class="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition shadow-sm"
        >
          <p class="text-lg font-semibold text-gray-800">Minhas Consultas</p>
          <p class="text-sm text-gray-400 mt-1">Veja e gerencie suas consultas</p>
        </RouterLink>

        <RouterLink
          v-if="authStore.ehAdmin"
          to="/medicos"
          class="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition shadow-sm"
        >
          <p class="text-lg font-semibold text-gray-800">Médicos</p>
          <p class="text-sm text-gray-400 mt-1">Gerencie os médicos da clínica</p>
        </RouterLink>

        <RouterLink
          v-if="authStore.ehAdmin"
          to="/clinicas"
          class="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition shadow-sm"
        >
          <p class="text-lg font-semibold text-gray-800">Clínicas</p>
          <p class="text-sm text-gray-400 mt-1">Gerencie as clínicas cadastradas</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store'
import Navbar from '@/components/common/Navbar.vue'
const authStore = useAuthStore()
</script>