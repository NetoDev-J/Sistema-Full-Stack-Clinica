<template>
  <nav class="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
    <RouterLink to="/dashboard" class="flex items-center gap-2">
      <span class="text-blue-600 font-bold text-xl tracking-tight">Clínica</span>
    </RouterLink>

    <div class="flex items-center gap-6">
      <!-- Links de navegação -->
      <div class="hidden sm:flex items-center gap-4 text-sm text-gray-600">
        <RouterLink to="/consultas" class="hover:text-blue-600 transition" active-class="text-blue-600 font-medium">
          Consultas
        </RouterLink>
        <RouterLink v-if="authStore.ehPaciente || authStore.ehAdmin" to="/agendar" class="hover:text-blue-600 transition" active-class="text-blue-600 font-medium">
          Agendar
        </RouterLink>
        <RouterLink v-if="authStore.ehAdmin" to="/medicos" class="hover:text-blue-600 transition" active-class="text-blue-600 font-medium">
          Médicos
        </RouterLink>
        <RouterLink v-if="authStore.ehAdmin" to="/clinicas" class="hover:text-blue-600 transition" active-class="text-blue-600 font-medium">
          Clínicas
        </RouterLink>
      </div>

      <!-- Botão de usuário -->
      <button
        @click="menuAberto = !menuAberto"
        class="w-9 h-9 rounded-full border border-gray-200 bg-indigo-50 flex items-center justify-center text-blue-600 hover:bg-indigo-100 hover:border-blue-400 transition"
        :class="{ 'bg-indigo-100 border-blue-400': menuAberto }"
        aria-label="Menu do usuário"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      </button>
    </div>
  </nav>

  <!-- Overlay -->
  <Transition name="overlay">
    <div
      v-if="menuAberto"
      class="fixed inset-0 bg-black/20 z-20"
      @click="menuAberto = false"
    />
  </Transition>

  <!-- Menu lateral -->
  <Transition name="sidebar">
    <div
      v-if="menuAberto"
      class="fixed top-0 right-0 h-full w-64 bg-white border-l border-gray-100 shadow-lg z-30 flex flex-col"
    >
      <!-- Botão fechar -->
      <button
        @click="menuAberto = false"
        class="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Cabeçalho com dados do usuário -->
      <div class="flex items-center gap-3 px-5 py-5 border-b border-gray-100 pr-12">
        <div class="w-11 h-11 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-blue-600 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-800">{{ authStore.usuario?.nome }}</p>
          <p class="text-xs text-gray-400 capitalize">{{ authStore.perfil }}</p>
        </div>
      </div>

      <!-- Itens do menu -->
      <div class="flex-1 px-3 py-3">
        <RouterLink
          to="/perfil"
          @click="menuAberto = false"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Meu perfil
        </RouterLink>

        <div class="my-2 h-px bg-gray-100" />

        <button
          @click="authStore.logout(); menuAberto = false"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition w-full text-left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Sair
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
const menuAberto = ref(false)
</script>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(100%);
}
</style>