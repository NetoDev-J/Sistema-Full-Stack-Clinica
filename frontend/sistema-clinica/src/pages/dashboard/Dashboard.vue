<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 class="text-xl font-bold text-blue-600">Clínica</h1>
      <div class="flex items-center gap-4">
        <span class="text-sm text-gray-600">Olá, {{ authStore.usuario?.nome }}</span>
        <button @click="authStore.logout" class="text-sm text-red-500 hover:underline">Sair</button>
      </div>
    </nav>

    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Paciente e Admin -->
        <RouterLink
          v-if="authStore.ehPaciente || authStore.ehAdmin"
          to="/agendar"
          class="bg-blue-600 text-white rounded-xl p-6 hover:bg-blue-700 transition"
        >
          <h3 class="text-lg font-semibold">Agendar Consulta</h3>
          <p class="text-sm mt-1 opacity-80">Marque uma nova consulta</p>
        </RouterLink>

        <!-- Todos -->
        <RouterLink
          to="/consultas"
          class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow transition"
        >
          <h3 class="text-lg font-semibold text-gray-800">Minhas Consultas</h3>
          <p class="text-sm text-gray-500 mt-1">Veja e gerencie suas consultas</p>
        </RouterLink>

        <!-- Apenas Admin -->
        <RouterLink
          v-if="authStore.ehAdmin"
          to="/medicos"
          class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow transition"
        >
          <h3 class="text-lg font-semibold text-gray-800">Médicos</h3>
          <p class="text-sm text-gray-500 mt-1">Gerencie os médicos da clínica</p>
        </RouterLink>

        <RouterLink
          v-if="authStore.ehAdmin"
          to="/clinicas"
          class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow transition"
        >
          <h3 class="text-lg font-semibold text-gray-800">Clínicas</h3>
          <p class="text-sm text-gray-500 mt-1">Gerencie as clínicas cadastradas</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
</script>
